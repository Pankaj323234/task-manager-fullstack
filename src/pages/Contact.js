function Contact() {
  return (
    <div className="contact_us main_app">
      <div className="container">
        <div className="content_box ">
          <div className="card p-4 shadow-lg bg-dark border-0 text-white">

            <h1 className="text-center mb-4">
              📞 Contact Us
            </h1>

            <p className="text-center">
              Feel free to contact us for any queries, suggestions, or project feedback.
            </p>

            <div className="mt-4">

              <h5>👤 Developer</h5>
              <p>Pankaj Singh</p>

              <h5>📧 Email</h5>
              <p>pankaj@example.com</p>

              <h5>🌐 Project</h5>
              <p>Task Manager Full Stack Web Application</p>

              <h5>📍 Location</h5>
              <p>India</p>

            </div>

            {/* <div className="mt-4">
              <button className="btn btn-primary me-2">
                Send Message
              </button>

              <button className="btn btn-outline-light">
                Learn More
              </button>
            </div> */}

          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Contact;