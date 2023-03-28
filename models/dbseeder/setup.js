
const sequelize = require('../../models');

async function reset() {
    console.log('Will rewrite  example database, adding some dummy data.');

     await sequelize.sync({ force: true });
    console.log(sequelize.models.partdetail);    
   
   let data=    await sequelize.models.partdetail.findAll();
   
    await sequelize.models.partdetail.create({
        partnumber: 'petrol',
        partname: 'PULSAR PETROL TANK',
        partdiscription: 'PULSAR UG150 PETROL TANK',
        partprice: 1500,
        partimage: 'partdetails\\February2023\\felGeQEv9ORkEqOZaRcA.jpg',
        variant_id: 3,
        created_at: '2023-02-19 09:52:53',
        updated_at: '2023-02-19 09:52:53'
    });
    await sequelize.models.partdetail.create({
        partnumber: 'petrol tank',
        partname: 'PULSAR PETROL TANK',
        partdiscription: 'PULSAR UG150 PETROL TANK',
        partprice: 1500,
        partimage: 'partdetails\\February2023\\pW0MbvByLgG1s7Yr89TB.jpg',
        variant_id: 4,
        created_at: '2023-02-19 09:53:27',
        updated_at: '2023-02-19 09:53:27'
    });
}

reset()