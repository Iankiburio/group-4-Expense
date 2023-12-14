import React, { Component } from 'react';

// Define the Footer component
class Footer extends Component {
    render() {
        return (
            // Styling for the footer container
            <div style={{ backgroundColor: "black", fontSize: "13px", color: "white", width: "100%", height: "50px", marginBottom: "0px" }}>
                {/* Footer content with copyright information */}
                <footer>&copy; Copyright 2023 Expense Tracker</footer>
            </div>
        );
    }
}

export default Footer;
