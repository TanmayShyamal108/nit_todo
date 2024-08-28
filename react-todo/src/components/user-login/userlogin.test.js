

import { screen, render } from "@testing-library/react";
import { UserLogin } from "./userlogin";

test("Title Test", () => {

    render(<UserLogin />);

    let title = screen.getByTestId("title");
    expect(title).toHaveTextContent("User Login");

});
