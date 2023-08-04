import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <div className="fixed-top">
        <nav className="navbar navbar-expand navbar-light" style={{"backgroundColor": "#e3f2fd"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">なおさんのツール置き場</a>
                <div className="navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        <Link className="nav-link" href="/livestream/sms/">Live Stream</Link>
                    </div>
                </div>
            </div>
        </nav>
        </div>
    )
}

export default Header;