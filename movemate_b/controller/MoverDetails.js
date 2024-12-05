const MoverData = require('../model/MoverAvailabilityModel'); // Path to your MoverData model

const getMoverDetails = async (req, res) => {
  const { moverId, date, time, location } = req.body; 

  try {
    const formattedDate = new Date(date);
    
    const mover = await MoverData.findOne({
      moverId,
      date: formattedDate,
      time,
      city: location, 
    });

    if (!mover) {
      return res.status(404).json({ message: 'Mover not found for the given criteria.' });
    }

    return res.status(200).json({
      moverId: mover.moverId,
      pricePerKm: mover.pricePerKm,
    });
  } catch (error) {
    console.error('Error fetching mover details:', error);
    return res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

module.exports = { getMoverDetails };
