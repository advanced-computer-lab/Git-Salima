# Git-Salima
<h2>Project Title</h2>
A flight reservation system under the name Git Salima Airlines aims to provide a smooth flight booking system with integrated user and admin interfaces giving users the capabilities to view, book and edit flights . As for admins, they are able to create, edit and view flights. Thus accomplishing a fully independent system.
<h2>Motivation</h2>
Reviewing the existing flight reservation systems , whether owned by actual airlines or third-party companies , we have noticed a room for improvement. Whether in the overall UX, having hard-to-learn processes, non-efficient design for errors and UI that is not smooth. Having established a presence of a gap , we decided to combine the vantage points from the other systems and improve on them. Hence providing a better experience and interface so as to make the process of booking flights enhanced from A to Z.
<h2>Build Status</h2>
There is a slight UI inconsistency. Edge cases of deleting seats sometimes encounters inconsitency. Scripts were not implemented coherently. 
<h2>Code Style</h2>
We have found that camel notation provided consistency and uniformity along the development process. We have used APIs in order to have a uniform platform from accessing the database and the backend. 

 
<h2>Tech/Frame work used </h2>
The project used MERN stack. Mongo DB for the database , which implements NoSQL.  And Node.js for the backend. React for the frontend. 
<h2>Features
<h3>Regarding users:</h3>
Users could search across the whole database of flights with their preferred criteria of dates, destinations and arrivals, number of seats and flight class. Selection provides a smooth way of selecting both flights of the round trip. Selecting the seats and paying with their preferred  method. All of that notwithstanding, a user could edit or delete any of the flights of the booked trips. Seamless transitions and proactive design for errors ensures a uniform and clear experience for users. That coupled with a consistent colour palette provides a subtle flight booking experience.
<h3>Regarding Admins:</h3>
Admins have unrestricted access to all website functions, with a difference from the users of the ability to view all flights , create flights and editing flights. The aforementioned are displayed through a clear, concise and effective UI with proactive UX that guides through the features swiftly providing a subtle flight administering experience.
<h2>Code Examples</h2>
Text Fields Display:  <form onSubmit={loginHandler}>
                {loginError === false && (
                  <div>
                    <div className="form-group col-md-4">
                      <TextField
                        required
                        id="filled-helperText"
                        type="email"
                        aria-describedby="emailHelp"
                        label="Email"
                        variant="filled"
                        onChange={(e) => {
                          setuserEmail(e.target.value);
                        }}
                      />
                    </div>
 Backend login route : router.post("/login", async (req, res) => {
  const user1 = req.body.Email;
  const user2 = await User.find({ Email: user1 });
  if (user2.length == 0) res.send("naah");
  const Password12 = user2[0].Password;
  console.log(Password12);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("1234", salt);
  const Password1 = hashedPassword;
  try {
    if (await bcrypt.compare(req.body.Password, Password12)) {
      console.log("lakad wasalt");
      await axios
        .post("http://localhost:4000/login", { Email: user1 })
        .then((res1) => {
          console.log(res1.data.refreshToken);

          User.findByIdAndUpdate(user2[0]._id, {
            Token: res1.data.refreshToken,
          }).then((resu) => {
            res.send(res1.data.refreshToken);
          });
        });
    } else {
      return res.send(false);
    }
  } catch (error) {
    throw error;
  }
});               
<h2>Installation</h2>
The project heavily depended on Material UI for frontend purposes , so all libraries of material UI including lab and font were used. Stripes API and Nodemailer API were used for payment and email sending respectively , providing swift communication between server , user and payment servers.
<h2>API reference</h2>
We have used the apis of material UI available here : https://mui.com/
NodeMailer : https://nodemailer.com/
Stripe’s: https://stripe.com/docs/api 
Bcrypt :  https://www.npmjs.com/package/bcryptjs

<h2>Tests</h2>
This is the section where you mention all the different tests that can be performed with code examples
<h2>How to Use?</h2>
Calling the main URL , in the undeployed case is localhost:/3000 , prompts a login or a sign up or a possibility to continue as a guest but without any core functions of reservation , just viewing of flights. The process henceforth is considered straight forward. With steppers guiding the way , the user always knows where do they stand in the process of booking a flight. With e-mails sent as confirmation. Also admins are allowed access on the same website with seamless access permission and restriction for the distinct personnel authorized to access restricted routes. Proactive design for errors guides through any requirements of data entry.
<h2>Contribute</h2>
Any additions to the frontend making  for a swifter experience or more efficient backend are highly prized and appreciated.
  <h2>Credits</h2>
A big thank you for our TA at the GUC Ahmed Alaa , who provided unparalleled guidance and tips with humility and responsiveness.

