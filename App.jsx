//setup react Router
const {Link} = ReactRouter;
const {Route, Router} = ReactRouter;

videos = new Mongo.Collection('videos');
comments = new Mongo.Collection('comments');

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
            return (<div className="container-fluid footer">
                        &copy;2016 website incorporated.
                    </div>                
                    )}
            })
// App component - represents the whole app
Video = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
                info : videos.find({ _parentID : this.props.parentID}).fetch()
            }
    },
    render() {
        return (
            <div className="video-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 embed-responsive embed-responsive-16by9">
                            <video controls className="embed-responsive-item" src={this.data.info[0]['url']} poster={this.data.info[0].poster} type="video/mp4"></video>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
});

Form = React.createClass({
    // This mixin makes the getMeteorData method work
    addComment(event) {

        event.preventDefault();

        // Find the text field via the React ref
        var commentText = ReactDOM.findDOMNode(this.refs.commentText).value.trim();
        var nameText = ReactDOM.findDOMNode(this.refs.nameText).value.trim();

        comments.insert({
            name: nameText,
            comment : commentText,
            createdAt: new Date(), // current time
            _parentID : this.props.parentID
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.commentText).value = "";
        ReactDOM.findDOMNode(this.refs.nameText).value = "";        
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div id="comments"></div>
                    <div className="col-xs-12" id="form">
                        <div className="input-group col-xs-12">
                            <form onSubmit={this.addComment} >
                                <input type="text" className="form-control form-entry" placeholder="Name" ref="nameText" />
                                <textarea className="form-control form-entry" placeholder="Comment" ref="commentText"></textarea>
                                <button type="submit" className="btn btn-success green pull-right">Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
});

CommentsHolder = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
                info : comments.find({ _parentID : this.props.parentID}).fetch()
            }
    },
    render() {
        return (
            <div className="col-xs-12" >
                {this.data.info.map((data) => {
                    return <Comment key={data._id} name={data.name} comment={data.comment} time={data.createdAt}/>;
                })}
            </div>
        );
    }
});

/**
 * [createClass description]
 * @param  {[type]} {   render( [description]
 * @return {[type]}            [description]
 */
Comment = React.createClass({
    render() {
        return (
            <div className="col-xs-12 comment">
                <div className="col-xs-4 time" >
                    <span className="glyphicon glyphicon-time">
                    </span>
                    <span>{this.props.createdAt}</span>
                </div>
                <div className="col-xs-8">
                    <h4>{this.props.name}</h4>
                    <hr/>               
                    {this.props.comment}
                </div>
            </div>
        );
    }
});

App = React.createClass({
    render() {
        var _parentID = this.props.routeParams.id;
        return (
            <div>
                <Nav />
                <Video parentID={_parentID} />
                <CommentsHolder parentID={_parentID} />
                <Form parentID={_parentID} />
                <Footer />
            </div>
            );
    }
});