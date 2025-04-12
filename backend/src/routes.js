const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../prisma/src/generated/client'); // Adjust path if necessary. This assumes it is in src/generated/client
const prisma = new PrismaClient();


//Get all parking space names
router.get('/', async (req, res) => {
    try{
        
        res.json({message: "Welcome to the Parking Space API"});
    }catch(error){
        console.error("Error fetching parking space names:", error);
        res.status(500).json({error: "Failed to fetch parking space names"});
    }
});

router.get('/parkingspaces/names', async (req, res) => {
    try{
        const parkingSpaces = await prisma.parkingSpace.findMany({select: {parkingSpaceName: true}});
        res.json(parkingSpaces);
    }catch(error){
        console.error("Error fetching parking space names:", error);
        res.status(500).json({error: "Failed to fetch parking space names"});
    }
});

//Get all parking spaces
router.get('/parkingspaces', async (req, res) => {
    try{
        const parkingSpaces = await prisma.parkingSpace.findMany();
        res.json(parkingSpaces);
    }catch(error){
        console.error("Error fetching parking spaces:", error);
        res.status(500).json({error: "Failed to fetch parking spaces"});
    }
});


// Get available parking spaces for a specific parking lot name.
router.get('/parkingspaces/:parkingSpaceName/available', async (req, res) => {
    const parkingSpaceName = req.params.parkingSpaceName;
    try {
        // Assuming lastUserId being null means the space is available.
        const availableSpaces = await prisma.parkingSpace.count({
            where: {
                parkingSpaceName,
                lastUserId: null,
            },
        });
        res.json({ availableSpaces });
    } catch (error) {
        console.error("Error fetching available parking spaces:", error);
        res.status(500).json({ error: 'Failed to fetch available parking spaces' });
    }
});



module.exports = router;
