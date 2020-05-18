import React, {useState, useEffect} from "react";
import * as yup from "yup";
import Pizza from './Assets/Pizza.jpg';
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().min(2, "* Name must be atleast 2 chracters long."),
  size: yup.string(),
  sauce: yup.string(),
  instructions: yup.string()
})

export default function PizzaForm() {
  const [pizzaState, setPizzaState] = useState({
    name: "",
    size: "",
    sauce: "",
    instructions: ""
  })
  const [isbuttonDisabled, setIsButtonDisabled] = useState(true);
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(pizzaState).then(valid => {
      setIsButtonDisabled(!valid)
    })
  }, [pizzaState])

  const [errorState, setErrors] = useState({
    name: ""
  })

  const validate = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errorState,
          [e.target.name]: ""
        })
      })
      .catch(err => {
        console.log(err.errors)
        setErrors({
          ...errorState,
          [e.target.name]: err.errors[0]
        })
      })
  }

  const inputChange = e => {
    e.persist();
    validate(e);
    let value = 
      e.target.type === "radio" ? e.target.id : e.target.value;
    setPizzaState({...pizzaState, [e.target.name]: value});
  }

  const formSubmit = e => {
    e.preventDefault()
    console.log('form submitted!')
    axios
      .post("https://reqres.in/api/users", pizzaState)
      .then(response => {
        setPost([...post, response.data])
        console.log(pizzaState)
      }).catch(err => console.log(err))
  }
  return (
    <form className="form-container" onSubmit={formSubmit}>
      <h1>Build Your Own Pizza</h1>
      <img src={Pizza} alt="Pizza Image" />
      <div className="form-info">
        <div className="NameForOrder">
          <label htmlFor="name"> 
          Name For Order:
          <div>
            <input 
                className="ordername"
                id="name"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={pizzaState.name}
                onChange={inputChange} 
              />
          </div>  
          {errorState.name.length > 0 ? (
          <p className="error">{errorState.name}</p>
          ) : null}
          </label>
        </div>
        <div className="Selection-Header">
        <label htmlFor="SizeChoice">Choice of Size</label>
        <p>Required</p>
        </div>
        <div className="selectoption">
          <select name="size" id="size" value={pizzaState.size} onChange={inputChange} >
            <option>Select:</option>
            <option name="small">Small</option>
            <option name="medium">Medium</option>
            <option name="large">Large</option>
            <option name="extra large">Extra Large</option>
        </select>
        </div>
        <div className="Selection-Header">
          <label htmlFor="SauceChoice">Choice of Sauce</label>
          <p>Required</p>
        </div>
        <div className="ChoiceSauce"> 
          <label htmlFor="sauce">
            <input 
              type="radio" 
              name="sauce" 
              id="Original Red"
              // checked = "checked" 
              value={pizzaState.sauce}
              onChange={inputChange} 
            />
            Original Red
          </label>
          <label htmlFor="sauce">
            <input 
              type="radio" 
              name="sauce" 
              id="Garlic Ranch"
              value={pizzaState.sauce}
              onChange={inputChange} 
            />
            Garlic Ranch
          </label>
          <label htmlFor="sauce">
            <input 
              type="radio" 
              name="sauce" 
              id="BBQ Sauce"
              value={pizzaState.sauce}
              onChange={inputChange} 
            />
            BBQ Sauce
          </label>
          <label htmlFor="sauce">
            <input 
              type="radio" 
              name="sauce" 
              id="Spinach Alfredo"
              value={pizzaState.sauce}
              onChange={inputChange} 
            />
            Spinach Alfredo
          </label>
        </div>
        {/* <div className="Selection-Header">
        <label htmlFor="ToppingsChoice">Add Toppings</label>
        <p>Choose up to 4</p>
        </div> */}
        {/* <div className="ChoiceSauce">
          <label htmlFor="Pepperoni">
            <input 
              type ="checkbox" 
              id="Pepperoni" 
              name="Pepperoni" 
              value="Pepperoni" 
            />
            Pepperoni
          </label>
          <label htmlFor="Sausage">
            <input 
              type ="checkbox" 
              id="Sausage" 
              name="Sausage" 
              value="Sausage" 
            />
            Sausage
          </label>
          <label htmlFor="Canadian Bacon">
            <input 
              type ="checkbox" 
              id="Canadian Bacon" 
              name="Canadian Bacon" 
              value="Canadian Bacon" 
            />
            Canadian Bacon
          </label>
          <label htmlFor="Grilled Chicken">
            <input 
              type="checkbox" 
              id="Grilled Chicken" 
              name="Grilled Chicken" 
              value="Grilled Chicken" 
            />
            Grilled Chicken
          </label>
        </div> */}
        <div className="Selection-Header">
        <label htmlFor="SpecialInstructions">Special Instructions</label>
        </div>
        <div className="selectoption">
          <input 
            className="instructions"
            type="text"
            name="instructions"
            id="instructions"
            placeholder="Anything else you'd like to add?"
            value={pizzaState.instructions}
            onChange={inputChange} 
          />
        </div>
        <button disabled={isbuttonDisabled}>Add to Order</button>
      </div>
    </form>
  )
}