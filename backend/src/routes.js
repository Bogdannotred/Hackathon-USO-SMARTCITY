const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../prisma/src/generated/client');
const prisma = new PrismaClient();


//Test Working API
router.get('/', async (req, res) => {
    try{
        
        res.json({message: "Welcome to the Parking Space API"});
    }catch(error){
        console.error("Error fetching parking space names:", error);
        res.status(500).json({error: "Failed to fetch parking space names"});
    }
});

//Get all parking lots
router.get('/parkinglot', async (req, res) => {
  try{
      const parkingLot = await prisma.parkingLot.findMany();
      res.json(parkingLot);
  }catch(error){
      console.error("Error fetching parking lots:", error);
      res.status(500).json({error: "Failed to fetch parking spaces"});
  }
});

router.get('/parkingspaces/:parkingLotId', async (req, res) => {
  const parkingLotId = parseInt(req.params.parkingLotId, 10);

  try {
    const parkingSpaces = await prisma.parkingSpace.findMany({
      where: { parkingLotId },
      select: {
        name: true,
        location: true,
        geoLocation: true,
        isAvailable: true,
        expiresAt: true,
        lastUserId: true,
      },
    });

    if (parkingSpaces.length === 0) {
      return res.status(404).json({ message: 'No parking spaces found for this parking lot.' });
    }

    res.json(parkingSpaces);
  } catch (error) {
    console.error("Error fetching parking spaces:", error);
    res.status(500).json({ error: "Failed to fetch parking spaces" });
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
