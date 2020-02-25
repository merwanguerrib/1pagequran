import React from "react";

const Form = () => (
  <>
    <form action="" method="post" id="signup">
      <label>Email</label>
      <input type="email" />
      <label>Translation Type</label>
      <input type="radio" id="en" name="translationType" value="English" />
      <input type="radio" id="fr" name="translationType" value="Français" />
    </form>
    <button type="submit" form="signup" value="I register">
      I register
    </button>
  </>
);

export default Form;
