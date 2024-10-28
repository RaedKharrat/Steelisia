import React from 'react';
// import './Header.css'; // Uncomment this line to use your CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons'; // Importing necessary icons


const Header = () => {
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Add your search handling logic here
      event.preventDefault();
      // Example: console.log("Searching for:", event.target.value);
    }
  };

  return (
    <header className="header-area header-sticky"   style={{
        opacity: 0.95,
        backdropFilter: 'blur(80rm)', // Use quotes for the value
        borderRadius:'10px'
      }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* ***** Logo Start ***** */}
              <a href="index.html" className="logo">
                <h1>Steelisia </h1>
              </a>
              {/* ***** Logo End ***** */}

              {/* ***** Search Start ***** */}
              <div className="search-input">
                <form id="search" action="#">
                    <input
                    type="text"
                    placeholder="Type Something"
                    id="searchText"
                    name="searchKeyword"
                    onKeyPress={handleSearchKeyPress} // Make sure to handle this function correctly
                    />
                    <i className="fa fa-search"></i> {/* FontAwesome icon */}
                </form>
                </div>

              {/* ***** Search End ***** */}

              {/* ***** Menu Start ***** */}
              <ul className="nav">
                <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                <li className="scroll-to-section"><a href="#services">Services</a></li>
                <li className="scroll-to-section"><a href="#courses">Courses</a></li>
                <li className="scroll-to-section"><a href="#team">Team</a></li>
                <li className="scroll-to-section"><a href="#events">Events</a></li>
                <li className="scroll-to-section"><a href="#contact">Register Now!</a></li>
                <li className="scroll-to-section"><a href="#contact" style={{color:'white'}}> <strong>Sign In</strong></a></li>

              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
              {/* ***** Menu End ***** */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
