const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Team = require("../models/Team.model");
const cloudinary = require("../cloud/cloudinary");
const jwt = require("jsonwebtoken");
const csv = require("csvtojson");
const Department = require("../models/Department.model");
const { generateRandomPassword, deleteFile } = require("../utils/helper");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, teamSize } = req.body;
    if (!title || !description || !date || !teamSize) {
      return res.status(400).json({
        message: "Title, description, date, teamSize are required",
      });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Poster is required" });
    }
    const re = await cloudinary.uploader.upload(file.path);
    const event = await Event.create({
      title,
      description,
      poster: re.secure_url,
      date,
      teamSize,
    });
    await event.save();
    res.status(201).json({ event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const { title, description, date, teamSize } = req.body;
    if (!title && !description && !date && !teamSize) {
      return res.status(400).json({
        message: "Title, description, date, teamSize are required",
      });
    }
    const file = req.file;
    if (!file) {
      if (title) {
        event.title = title;
      }
      if (description) {
        event.description = description;
      }
      if (date) {
        event.date = date;
      }
      if (teamSize) {
        event.teamSize = teamSize;
      }

      await event.save();
      return res.status(200).json({ event });
    } else {
      const res = await cloudinary.uploader.upload(file.path);
      event.poster = res.secure_url;
      if (title) {
        event.title = title;
      }
      if (description) {
        event.description = description;
      }
      if (date) {
        event.date = date;
      }
      if (teamSize) {
        event.teamSize = teamSize;
      }
      await event.save();
      return res.status(200).json({ message: "Event Updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    await User.deleteMany({ eventId: id });
    await Team.deleteMany({ eventId: id });
    await Department.deleteMany({ eventId: id });
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const { name, executiveId, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!executiveId) {
      return res.status(400).json({ message: "Executive is required" });
    }
    const user = await User.findById(executiveId);
    if (!user) {
      return res.status(400).json({ message: "Invalid executive" });
    }
    if (user.role != "executiveAdmin") {
      return res.status(400).json({ message: "User is not an executive" });
    }
    if (user.departmentId != null) {
      return res
        .status(400)
        .json({ message: "User is already a department head" });
    }
    const department = await Department.create({
      name,
      description,
      eventId: id,
      departmentHead: executiveId,
    });
    await department.save();
    user.departmentId = department._id;
    await user.save();
    event.departments.push(department._id);
    await event.save();
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(400).json({ message: "Invalid department" });
    }
    if (department.eventId.toString() !== id) {
      return res.status(400).json({ message: "Invalid department" });
    }
    const userId = department.departmentHead;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    user.departmentId = null;
    await user.save();
    await Department.findByIdAndDelete(departmentId);
    res.status(200).json({ message: "Department removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const departments = await Department.find({ eventId: id });
    res.status(200).json({ departments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { id, departmentId } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(400).json({ message: "Invalid department" });
    }
    if (department.eventId.toString() !== id) {
      return res.status(400).json({ message: "Invalid department" });
    }
    const { name, description, executiveId } = req.body;
    if (name) {
      department.name = name;
    }
    if (description) {
      department.description = description;
    }
    if (executiveId) {
      const user = await User.findById(executiveId);
      if (!user) {
        return res.status(400).json({ message: "Invalid executive" });
      }
      if (user.role != "executiveAdmin") {
        return res.status(400).json({ message: "User is not an executive" });
      }
      if (user.departmentId != null) {
        return res
          .status(400)
          .json({ message: "User is already a department head" });
      }
      const userId = department.departmentHead;
      if (userId) {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).json({ message: "Invalid user" });
        }
        user.departmentId = null;
        await user.save();
      }
      department.departmentHead = executiveId;
      user.departmentId = department._id;
      await user.save();
    }
    await department.save();
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const teams = await Team.find({ eventId: id }).populate("teamLead");
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const { id, teamId } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const team = await Team.findById(teamId).populate("teamLead");
    if (!team) {
      return res.status(400).json({ message: "Invalid team" });
    }
    if (team.eventId.toString() !== id) {
      return res.status(400).json({ message: "Invalid team" });
    }
    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id, teamId } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team" });
    }
    if (team.eventId.toString() !== id) {
      return res.status(400).json({ message: "Invalid team" });
    }
    await Team.findByIdAndDelete(teamId);
    res.status(200).json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.banTeam = async (req, res) => {
  try {
    const { id, teamId } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team" });
    }
    if (team.eventId.toString() !== id) {
      return res.status(400).json({ message: "Invalid team" });
    }
    team.banned = true;
    await team.save();
    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unbanTeam = async (req, res) => {
  try {
    const { id, teamId } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team" });
    }
    if (team.eventId.toString() !== id) {
      return res.status(400).json({ message: "Invalid team" });
    }
    team.banned = false;
    await team.save();
    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTeams = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }
    const date = file.filename.split("-")[1].split(".")[0];
    // console.log(date,file);
    const teams = await csv().fromFile(file.path);
    const result = [];
    for (let i = 0; i < teams.length; i++) {
      if (
        teams[i].email === "" ||
        teams[i].name === "" ||
        teams[i].amount == "" ||
        teams[i].leadName === ""
      ) {
        break;
      }
      const userExists = await User.findOne({ email: teams[i].email });
      if (userExists && userExists.eventId.toString() === id) {
        continue;
      } else if (userExists && userExists.eventId.toString() !== id) {
        await User.findByIdAndDelete(userExists._id);
      }
      const pass = generateRandomPassword(12);
      const user = await User.create({
        email: teams[i].email,
        name: teams[i].leadName,
        password: pass,
        isTeamLead: true,
        eventId: id,
      });
      const team = await Team.create({
        teamLead: user._id,
        eventId: id,
        name: teams[i].name,
        amount: +teams[i].amount,
      });
      await team.save();
      user.teamId = team._id;
      await user.save();
      result.unshift({ user, team });
    }
    deleteFile(file.path);
    res.status(201).json({ message: "Teams added", teams: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.history = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role === "user") {
      const user = await User.findById(decoded.id);
      const history = await Team.findById(user.teamId)
        .populate("history")
        .populate("requests")
        .populate({
          path: "requests",
          populate: {
            path: "department",
            model: "Department",
          },
        });
      // console.log(history);
      res.status(200).json({ history });
    } else {
      res.status(200).json({ message: "no history" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
