const Crop = require('../models/Crop');

// @desc    Create a new crop listing
// @route   POST /api/crops
// @access  Private (Farmer only)
exports.createCrop = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.farmer = req.user.id;

        // Handle image uploads if any (processed by multer middleware)
        if (req.files) {
            req.body.images = req.files.map(file => file.path);
        }

        // Add location from user profile if not provided
        if (!req.body.location && req.user.farmDetails && req.user.farmDetails.location) {
            req.body.location = req.user.farmDetails.location;
        }

        const crop = await Crop.create(req.body);

        res.status(201).json({
            success: true,
            data: crop
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all crops with search and filter
// @route   GET /api/crops
// @access  Public
exports.getCrops = async (req, res, next) => {
    try {
        const {
            search,
            category,
            isOrganic,
            minPrice,
            maxPrice,
            location,
            farmer,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 10
        } = req.query;

        // Build query
        let query = { status: 'available' };

        // Admin can see all, but for public API, we might want to restrict status
        // For My Crops, we might want to see 'sold' ones too?
        // Let's stick to status: 'available' by default unless specified?
        // Actually, for "My Crops", we want to see ALL our crops regardless of status.
        // But the current implementation forces status: 'available'.
        // Let's relax that if 'farmer' is specified? OR just allow overriding 'status'.

        if (farmer) {
            query.farmer = farmer;
            // If viewing my crops, allow all statuses? Or should status be a filter?
            // Let's allow status to be passed in query if we want to override default
            if (req.query.status) {
                query.status = req.query.status;
            } else {
                delete query.status; // Remove default 'available' constraint for farmer view
            }
        }

        // Text search
        if (search) {
            query.$text = { $search: search };
        }

        // Filters
        if (category) query.category = category;
        if (isOrganic !== undefined) query.isOrganic = isOrganic === 'true';

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (location) {
            query.$or = [
                { 'location.district': new RegExp(location, 'i') },
                { 'location.state': new RegExp(location, 'i') }
            ];
        }

        // Pagination
        const skip = (page - 1) * limit;

        // Sort
        let sortOption = {};
        sortOption[sortBy] = order === 'asc' ? 1 : -1;

        const crops = await Crop.find(query)
            .populate('farmer', 'name profilePicture farmDetails')
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const total = await Crop.countDocuments(query);

        res.status(200).json({
            success: true,
            count: crops.length,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalCrops: total
            },
            data: crops
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Public
exports.getCrop = async (req, res, next) => {
    try {
        const crop = await Crop.findById(req.params.id).populate('farmer', 'name profilePicture farmDetails');

        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }

        res.status(200).json({ success: true, data: crop });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private (Farmer only)
exports.updateCrop = async (req, res, next) => {
    try {
        let crop = await Crop.findById(req.params.id);

        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }

        // Make sure user is crop owner
        if (crop.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to update this crop' });
        }

        // Handle image uploads if any (processed by multer middleware)
        console.log('Update Crop Req Files:', req.files);
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.path);
            console.log('Update Crop New Images:', req.body.images);
        }

        // Auto-update status if quantity is restocked
        if (req.body.availableQuantity && Number(req.body.availableQuantity) > 0) {
            req.body.status = 'available';
        }

        crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: crop });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private (Farmer only)
exports.deleteCrop = async (req, res, next) => {
    try {
        const crop = await Crop.findById(req.params.id);

        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }

        // Make sure user is crop owner
        if (crop.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this crop' });
        }

        await crop.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
