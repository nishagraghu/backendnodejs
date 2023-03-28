
const sequelize = require('../../models');


async function reset() {
    console.log('Will rewrite  example database, adding some dummy data.');

    await sequelize.sync({ force: true });
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
    await sequelize.models.yearofmake.bulkCreate([
        {
            year: '2001-2003/ACCORD',
            modeel_id: 1,
            created_at: '2022-12-28 03:30:00',
            updated_at: '2022-12-30 09:31:10'
        },
        {
            year: '2007-2010/PULSAR',
            modeel_id: 2,
            created_at: '2023-01-11 06:42:00',
            updated_at: '2023-02-19 10:18:27'
        },
        {
            year: '2020-2023/TRIUMPH',
            modeel_id: 7,
            created_at: '2023-02-19 10:09:00',
            updated_at: '2023-02-19 10:17:51'
        }
    ]);
    await sequelize.models.brand.bulkCreate([
        {
            name: 'MARUTI SUZUKI',
            about: 'MARUTI SUZUKI',
            logo: 'brand\\December2022\\gcDEeAhp8LVtUJTxvILb.png',
            created_at: '2022-12-27 23:42:00',
            updated_at: '2022-12-27 23:55:54'
        },
        {
            name: 'TOYOTA',
            about: 'TOYOTA',
            logo: 'brand\\December2022\\61mOjBEzwomiFhah9jiy.png',
            created_at: '2022-12-27 23:58:18',
            updated_at: '2022-12-27 23:58:18'
        },
        {
            name: 'HONDA',
            about: 'HONDA',
            logo: 'brand\\January2023\\vATjNgkKQadMhsq17ZGH.png',
            created_at: '2022-12-27 23:59:00',
            updated_at: '2023-01-11 06:03:27'
        },
        {
            name: 'BAJAJ',
            about: 'PULSAR',
            logo: 'brand\\January2023\\DvOhgQEobjCOIsYGLIzs.png',
            created_at: '2023-01-09 07:56:00',
            updated_at: '2023-01-09 08:02:01'
        },
        {
            name: 'YAMAHA',
            about: 'Yamaha',
            logo: 'brand\\January2023\\vsEq2aHoJeMELWg08Kff.png',
            created_at: '2023-01-11 06:02:30',
            updated_at: '2023-01-11 06:02:30'
        },
        {
            name: 'HERO',
            about: 'Hero',
            logo: 'brand\\January2023\\rVqA1id9wZdOdtwEmbXZ.png',
            created_at: '2023-01-11 06:26:59',
            updated_at: '2023-01-11 06:26:59'
        },
        {
            name: 'KTM',
            about: 'Ktm',
            logo: 'brand\\January2023\\GxLmVARw3eRnmUw2abV3.png',
            created_at: '2023-01-11 06:27:28',
            updated_at: '2023-01-11 06:27:28'
        },
        {
            name: 'ROYAL ENFIELD',
            about: 'Royal Enfield',
            logo: 'brand\\January2023\\hKvNorjypoogAKzw1PzM.jpg',
            created_at: '2023-01-11 06:28:06',
            updated_at: '2023-01-11 06:28:06'
        },
        {
            name: 'TVS',
            about: 'TVS',
            logo: 'brand\\January2023\\tjg1VFq57JjiVyKi71Bl.png',
            created_at: '2023-01-11 06:28:35',
            updated_at: '2023-01-11 06:28:35'
        },
        {
            name: 'MAHENDRA',
            about: 'Mahendra',
            logo: 'brand\\January2023\\IHNMg8VLkG4xLwTZYlrb.png',
            created_at: '2023-01-11 06:29:07',
            updated_at: '2023-01-11 06:29:07'
        },
        {
            name: 'APPRILIA',
            about: 'Apprilia',
            logo: 'brand\\January2023\\VdooD6PUOuX0TbKc9xk0.png',
            created_at: '2023-01-11 06:29:59',
            updated_at: '2023-01-11 06:29:59'
        },
        {
            name: 'SUZUKI',
            about: 'Suzuki',
            logo: 'brand\\January2023\\i9eGoOfwl8tmZKWVJabv.png',
            created_at: '2023-01-11 06:30:26',
            updated_at: '2023-01-11 06:30:26'
        },
        {
            name: 'BMW',
            about: 'BMW',
            logo: 'brand\\January2023\\5A7OgSrdsUm9NxQK1CfR.webp',
            created_at: '2023-01-11 06:30:49',
            updated_at: '2023-01-11 06:30:49'
        },
        {
            name: 'BAJAJ',
            about: 'Discover',
            logo: 'brand\\February2023\\vUa2HPAXpxuJAAgxhsIM.jpg',
            created_at: '2023-02-11 05:29:09',
            updated_at: '2023-02-11 05:29:09'
        },
        {
            name: 'TRIUMPH',
            about: '1200 CC',
            logo: 'brand\\February2023\\tEVtghavRyxgv6JeGgM9.jpg',
            created_at: '2023-02-19 10:06:47',
            updated_at: '2023-02-19 10:06:47'
        }]);




    await sequelize.models.modeinfo.bulkCreate([
        {
            name: 'ACCORD',
            brand_id: 3,
            images: null,
            created_at: '2022-12-28 03:26:50',
            updated_at: '2022-12-28 03:26:50'
        },
        {
            name: 'Pulsar',
            brand_id: 5,
            images: '["modeinfo\\\\January2023\\\\B7AGruxGReN5NHYviqvN.png"]',
            created_at: '2023-01-11 06:34:25',
            updated_at: '2023-01-11 06:34:25'
        },
        {
            name: 'BMW G RR310',
            brand_id: 18,
            images: '["modeinfo\\\\January2023\\\\Iz73bkAqk1MMag0HFvyE.webp"]',
            created_at: '2023-01-11 06:37:21',
            updated_at: '2023-01-11 06:37:21'
        },
        {
            name: 'APACHI RR310',
            brand_id: 14,
            images: '["modeinfo\\\\January2023\\\\NuEP3cTjwEKYgz9W3rCz.jpg"]',
            created_at: '2023-01-11 06:39:01',
            updated_at: '2023-01-11 06:39:01'

        },
        {
            name: 'CLASSIC 350',
            brand_id: 12,
            images: '["modeinfo\\\\January2023\\\\AtusgBcvOUoMdUUjP1GW.png"]',
            created_at: '2023-01-11 06:40:40',
            updated_at: '2023-01-11 06:40:40'

        },
        {
            name: 'BAJAJ discover',
            brand_id: 5,
            images: '["modeinfo\\\\February2023\\\\iRc7K8n2QF93yKbDtW41.jpg"]',
            created_at: '2023-02-11 05:29:00',
            updated_at: '2023-02-11 05:30:25'
        },
        {
            name: 'TRIUMPH',
            brand_id: 21,
            images: '["modeinfo\\\\February2023\\\\Qok9ke6304SoUmfU40on.jpg"]',
            created_at: '2023-02-19 10:07:45',
            updated_at: '2023-02-19 10:07:45'
        }
    ]);
    await sequelize.models.variant.bulkCreate([
        {
            name: '2.3L VTI | PETROL',
            year_make: 1,
            created_at: '2022-12-28 03:45:13',
            updated_at: '2022-12-28 03:45:13'
        },
        {
            name: '2.4L VTI | PETROL',
            year_make: 1,
            created_at: '2022-12-30 09:30:16',
            updated_at: '2022-12-30 09:30:16'
        },
        {
            name: 'BAJAJ',
            year_make: 2,
            created_at: '2023-02-11 05:26:40',
            updated_at: '2023-02-11 05:26:40'
        },
        {
            name: 'TRIUMPH',
            year_make: 3,
            created_at: '2023-02-19 10:13:25',
            updated_at: '2023-02-19 10:13:25'
        },
    ]);








}

reset()