const nodemailer = require('nodemailer');

const sendSelectionEmails = async (req, res) => {
  const { users } = req.body;

  if (!users || users.length === 0) {
    return res.status(400).json({ error: 'No users provided' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send emails to all selected users
    const emailPromises = users.map(user => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Selection Notification',
        text: `Dear ${user.fullName},\n\nCongratulations! You have been selected for the first round.\n\nBest regards,\nPlacement Team`,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
};

module.exports = { sendSelectionEmails };
