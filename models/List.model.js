const sql = require("./db.js");

const List = {};

List.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT name, logo FROM brand";
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
    const query = "SELECT id, name FROM modeinfo WHERE brand_id = ?";
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
    const query = "SELECT id, year FROM yearofmake WHERE modeel_id = ?";
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
    const query = "SELECT id, name FROM variant WHERE year_make = ?";
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
