import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <section>
                <article className="container">
                    {/*<h4>Connect with me!</h4>
                    <div className="social-media">
                        <a href="https://github.com/ajCastiglione" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/antonio-castiglione-a110a7143/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                        <a href="mailto:aj@aj-castiglione.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-envelope"></i></a>
                        <a href="https://aj-castiglione.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-desktop"></i></a>
                    </div>*/}
                </article>

                <div className="after-footer">
                    <p>Built by <a href="https://aj-castiglione.com" target="_blank" rel="noopener noreferrer">AJ Castiglione</a></p>
                </div>
            </section>
        )
    }
}

export default Footer;