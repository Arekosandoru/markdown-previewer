import React from "react";
import PropTypes from "prop-types";

import Input, { InputLabel } from "material-ui/Input";

import { withStyles } from "material-ui/styles";

import Grid from "material-ui/Grid";
import marked from "marked";

const styles = theme => ({
    root: {
        textAlign: "center",
        padding: theme.spacing.unit * 5
    },
    inputWrap: {
        boxShadow: "0px -3px 16px 3px rgba(0, 0, 0, 0.16)",
        padding: "30px",
        height: "70vh",
        overflow: "auto"
    },
    gridItem: {
        minWidth: "500px"
    }
});

const URL = "https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif";
class Markdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: `# Marked in the browser\nRendered by **[marked.js.org](https://marked.js.org/)**.\n\n ![image example](${URL})\n-->`,
            isLowResolution: false
        };

        window.addEventListener("resize", () => {
            if (window.innerWidth < 1260) {
                this.setState({ isLowResolution: true });
            } else if (window.innerWidth >= 1260) {
                this.setState({ isLowResolution: false });
            }
        });
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        });
    };

    createMarkup() {
        return { __html: marked(this.state.value, { sanitize: true }) };
    }

    render() {
        const { classes } = this.props;
        const gridItemSize = this.state.isLowResolution ? 10 : 6;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={gridItemSize} className={classes.gridItem}>
                        <div className={classes.inputWrap}>
                            <InputLabel>Markdown</InputLabel>
                            <Input
                                value={this.state.value}
                                className={classes.input}
                                multiline
                                rows={30}
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={gridItemSize} className={classes.gridItem}>
                        <div className={classes.inputWrap}>
                            <InputLabel>Preview</InputLabel>
                            <div
                                dangerouslySetInnerHTML={this.createMarkup()}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Markdown.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Markdown);
