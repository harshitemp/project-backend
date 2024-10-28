// about.controller.js

exports.getAboutContent = (req, res) => {
    res.json({
      title: 'About Us',
      subtitle: 'Helping Students succeed in their placements.',
      description: 'We envision a future where students are fully prepared...',
      mission: 'To help manage campus placements by digitizing the process.',
      vision: 'A world where every student finds the right opportunity...',
      values: 'Transparency, innovation, and inclusivity...',
      images: {
        aboutUs: '/assets/images/aboutus.png',
        mission: '/assets/images/mission.png',
        values: '/assets/images/values.png',
      },
    });
  };
  
  exports.signupRedirect = (req, res) => {
    res.redirect('/signup'); // Redirect to signup page
  };
  