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



App = React.createClass({
    render() {
        var _parentID = this.props.routeParams.id;
        return (
            <div>
            </div>
            );
    }
});