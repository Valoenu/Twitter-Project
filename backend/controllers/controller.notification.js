import Notification from "../models/notification.model.js";

// create nottifications get function
export const notificationsGet = async (req, res) => {
  try {
    const userId = req.user._id; // get id

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });
    // Notification update Many function
    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications function", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// create nottifications delete function
export const notificationsDelete = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
