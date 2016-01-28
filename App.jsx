//setup react Router
const {Link} = ReactRouter;
const {Route, Router} = ReactRouter;


Meteor.startup( function() {
    AppRoutes = (
    <Router >
        <Route path="/:id" component={App}></Route>
    </Router>
    );

    ReactRouterSSR.Run(AppRoutes);
});

Nav = React.createClass({
        render() {
            return (<nav className="navbar navbar-default"><img alt="Brand" src="images/logo.png" width="25" /></nav>)
        }})

Footer = React.createClass({
        render() {
            return (<div className="container footer">
                        &copy;2016 website incorporated.
                    </div>                
                    )}
            })


App = React.createClass({
    render() {
        var _parentID = this.props.routeParams.id;
        return (
            <div>
                <Nav />
                <Footer />
            </div>
            );
    }
});