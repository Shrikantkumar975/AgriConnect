const StorageRequest = require('../models/StorageRequest');
const Warehouse = require('../models/Warehouse');

// @desc    Create a storage request
// @route   POST /api/storage-requests
// @access  Private (Farmer)
exports.createRequest = async (req, res) => {
    try {
        const { warehouseId, cropName, quantity, startDate, durationDays } = req.body;

        const warehouse = await Warehouse.findById(warehouseId);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        if (req.user.role !== 'farmer') {
            return res.status(403).json({ message: 'Only farmers can make storage requests' });
        }

        // Calculate total price
        const totalPrice = parseInt(quantity) * parseInt(durationDays) * warehouse.pricePerKgPerDay;

        const request = await StorageRequest.create({
            farmer: req.user.id,
            warehouse: warehouseId,
            cropName,
            quantity,
            startDate,
            durationDays,
            totalPrice,
            status: 'pending'
        });

        res.status(201).json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get my requests (Farmer)
// @route   GET /api/storage-requests/my-requests
// @access  Private
exports.getMyRequests = async (req, res) => {
    try {
        const requests = await StorageRequest.find({ farmer: req.user.id })
            .populate('warehouse', 'name location pricePerKgPerDay')
            .sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get requests for a specific warehouse (Owner)
// @route   GET /api/storage-requests/warehouse/:warehouseId
// @access  Private
exports.getWarehouseRequests = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.warehouseId);

        // Verify ownership
        if (warehouse.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const requests = await StorageRequest.find({ warehouse: req.params.warehouseId })
            .populate('farmer', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update request status (Approve/Reject)
// @route   PUT /api/storage-requests/:id/status
// @access  Private (Owner)
exports.updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const request = await StorageRequest.findById(req.params.id)
            .populate('warehouse');

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Verify ownership of the warehouse associated with the request
        if (request.warehouse.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (status === 'approved' && request.status !== 'approved') {
            // Check capacity
            if (request.warehouse.availableCapacity < request.quantity) {
                return res.status(400).json({ message: 'Not enough capacity available' });
            }

            // Deduct capacity
            request.warehouse.availableCapacity -= request.quantity;
            await request.warehouse.save();
        }

        // If rejecting a previously approved request (reverting), we might want to add capacity back? 
        // For now let's assume simple flow: Pending -> Approved/Rejected. 
        // If moving from Approved -> Rejected/Cancelled, we should add capacity back.
        if (request.status === 'approved' && (status === 'rejected' || status === 'cancelled')) {
            request.warehouse.availableCapacity += request.quantity;
            await request.warehouse.save();
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
