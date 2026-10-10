import Parkir from "../model/parkir.js";
import User from "../model/user.js";

export default class ParkirController {
  static async order(req, res) {
    try {
      const { nopol, duration } = req.body;
      const user_id = req.userId;

      const total = duration * 4000;

      const parkir = await Parkir.create({
        nopol,
        duration,
        user_id,
        total,
      });

      return res.json(parkir);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });

      }
    }


  static async get(req, res) {
  try {
    const user_id = req.userId;

    const parkir = await Parkir.findAll({
  where: { user_id },
});

    return res.json(parkir);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
  }
  static async update(req, res) {
    try {
      const { nopol, duration } = req.body;
      const user_id = req.userId;

      const total = duration * 4000;

      const parkir_id = req.params.id

      const parkir = await Parkir.create({
        nopol,
        duration,
        user_id,
        total,
      }, {
        where  :{
            id : parkir_id
        }
      });

      return res.json(parkir);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });

      }
    }
    static async cancel(req, res) {
  try {
    const parkir_id = req.params.id;
    const user_id = req.userId;

    const parkir = await Parkir.destroy({
      where: {
        id: parkir_id,
        user_id: user_id
      }
    });

    if (!parkir) {
      return res.status(404).json({
        message: "Data parkir tidak ditemukan"
      });
    }

    return res.json({
      message: "Parkir berhasil dibatalkan"
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}
}

