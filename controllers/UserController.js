import {Op} from "sequelize"
import User from "../model/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export default class UserController {
    static async store(req,res) {
        let { username, password, email} = req.body;
        password = bcrypt.hashSync(password,10);

        const  user = User.create({username,password,email});
        res.json(user);

    }
    static async get(req,res) {
        const users = await User.findAll();
        res.json(users);
    }
    static async detail(req,res) {
        const user = await User.findOne({where : {id: req.params.id  }})
        res.json(user);
    }


   static async update(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const { name, email, password } = req.body;
    const data = { name, email };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await user.update(data);

    res.json({ message: "User berhasil diupdate" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

    
    }
    static async delete(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    await user.destroy();

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }


}
static async login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password wajib diisi" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });

    if (user == null) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    return res.json({ accessToken: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

}
static async me (req,res){
    const userId = req.userId
    const user = await User.findOne({ where : {id : userId}});
    res.json(user);
    }
}


