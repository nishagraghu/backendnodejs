const sql = require("./db.js");

// constructor
const Refreshtokens  = function(refreshtoken) {
  this.token  = refreshtoken.token ;
 
};

Refreshtokens.create = (newRefreshToken, result) => {
    const now = new Date();
    newRefreshToken.created_at = now;
  sql.query("INSERT INTO refresh_tokens SET ?", newRefreshToken, (err, res) => {
    if (err) {
      
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId });
  });
};
Refreshtokens.findByToken = (id) => {
  return new Promise((resolve, reject) => {
    
    const query = "SELECT count(created_at) as refreshtokencount FROM refresh_tokens WHERE token = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
      } else {
       
        resolve(res);
      }
    });
  });
};
// Refreshtokens.findByToken = (token, result) => {
//   sql.query(`SELECT * FROM refresh_tokens WHERE token = "${token}"`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Refreshtokens with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// Refreshtokens.getAll = (title, result) => {
//   let query = "SELECT * FROM tutorials";

//   if (title) {
//     query += ` WHERE title LIKE '%${title}%'`;
//   }

//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Refreshtokens.getAllPublished = result => {
//   sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Refreshtokens.updateById = (id, tutorial, result) => {
//   sql.query(
//     "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
//     [tutorial.title, tutorial.description, tutorial.published, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Refreshtokens with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated tutorial: ", { id: id, ...tutorial });
//       result(null, { id: id, ...tutorial });
//     }
//   );
// };

Refreshtokens.remove = (token,result) => {
  console.log(token);
  sql.query("DELETE FROM refresh_tokens WHERE token  = ?",token, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Refreshtokens with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

// Refreshtokens.removeAll = result => {
//   sql.query("DELETE FROM Refreshtokenss", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} Refreshtokens`);
//     result(null, res);
//   });
// };

module.exports = Refreshtokens;