const sql = require("./db.js");

const List = {};

List.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id, name as value, logo FROM brand";
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

List.getModeinfo = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id, name as value FROM modeinfo WHERE brand_id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

List.getYearofMakeinfo = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id, SUBSTRING_INDEX(year, '/', 1)  as value FROM yearofmake WHERE modeel_id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
List.getVariantinfo = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id, name as value FROM variant WHERE year_make = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
List.getPartinfo = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT partnumber,partname,	partdiscription,partprice,partimage  FROM partdetails WHERE variant_id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};



module.exports = List;
