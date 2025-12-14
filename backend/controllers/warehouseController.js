const Warehouse = require('../models/Warehouse');
const User = require('../models/User');

// @desc    Create a new warehouse
// @route   POST /api/warehouses
// @access  Private (Warehouse Owner)
exports.createWarehouse = async (req, res) => {
    try {
        // Check if user is a warehouse owner
        if (req.user.role !== 'warehouse_owner' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to create a warehouse' });
        }

        const { name, location, storageType, totalCapacity, pricePerKgPerDay, amenities, description, images } = req.body;

        const warehouse = await Warehouse.create({
            owner: req.user.id,
            name,
            location,
            storageType,
            totalCapacity,
            availableCapacity: totalCapacity, // Initially full capacity available
            pricePerKgPerDay,
            amenities,
            description,
            images
        });

        res.status(201).json(warehouse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all warehouses with filters
// @route   GET /api/warehouses
// @access  Public
exports.getWarehouses = async (req, res) => {
    try {
        const { location, storageType } = req.query;
        let query = {};

        if (storageType) {
            query.storageType = storageType;
        }

        // Simple text search for location or name if specific geospatial search isn't requested yet
        if (location) {
            query.$or = [
                { 'location.city': { $regex: location, $options: 'i' } },
                { 'location.state': { $regex: location, $options: 'i' } },
                { name: { $regex: location, $options: 'i' } }
            ];
        }

        const warehouses = await Warehouse.find(query).populate('owner', 'name email phone');
        res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single warehouse
// @route   GET /api/warehouses/:id
// @access  Public
exports.getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id).populate('owner', 'name email phone');
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json(warehouse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get warehouses owned by logged in user
// @route   GET /api/warehouses/my/warehouses
// @access  Private (Owner)
exports.getMyWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find({ owner: req.user.id });
        res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
