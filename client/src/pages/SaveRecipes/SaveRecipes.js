import React from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, RadioBtn } from "../../components/Form";

// S A V E D   R E C I P E S   L I S T

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      name: "",
      ingredients: "",
      description: "",
      origin: "",
      labels: "",
    };
  }

  // When the component mounts, load all recipes and save them to this.state.recipes
  componentDidMount() {
    this.loadRecipes();
  }

  // Loads all recipes  and sets them to this.state.recipes
  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin: "", labels: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a recipe from the database with a given id, then reloads recipes from the db
  deleteRecipes = id => {
    API.deleteRecipes(id)
      .then(res => this.loadRecipes())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saverecipe method to save the recipe data
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.ingredients && this.state.description ) {
      API.saveRecipes({
        user: "test",
        name: this.state.name,
        ingredients: this.state.ingredients,
        description: this.state.description,
        sharable: true
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">

            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <TextArea
                value={this.state.ingredients}
                onChange={this.handleInputChange}
                name="ingredients"
                placeholder="Ingredients (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (required)"
              />
              <div className="radio">
                <RadioBtn
                  value={this.state.sharable}
                  onChange={this.handleInputChange}
                  name="share"
                  value="share"
                  checked = {this.state.selectedOption }>
                  Share
              </RadioBtn>
                <RadioBtn
                  value={this.state.sharable}
                  onChange={this.handleOptionChange}
                  name="noShare"
                  value="noShare"
                  checked = {this.state.selectedOption }>
                  Do not Share
              </RadioBtn>
              </div>
                <FormBtn
                  disabled={!(this.state.name && this.state.ingredients && this.state.description)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Recipe
              </FormBtn>
            </form>
          </Col>
            <Col size="md-6 sm-12">
            
            {this.state.recipes.length ? (
              <List>
                {this.state.recipes.map(recipes => {
                  return (
                    <ListItem key={recipes._id}>
                      <a href={"/recipes/" + recipes._id}>
                        <strong>
                          {recipes.name}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteRecipes(recipes._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
        );
      }
    }
    
    export default Recipes;
