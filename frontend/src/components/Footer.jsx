const Footer = () => (
  <footer className="app-footer">
    <div className="container-fluid px-3 px-lg-4">
      <span>&copy; {new Date().getFullYear()} GymOS. All rights reserved.</span>
      <span className="d-none d-sm-inline">Built with React & Spring Boot</span>
    </div>
  </footer>
);

export default Footer;
