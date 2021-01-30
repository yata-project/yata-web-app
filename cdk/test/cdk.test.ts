import * as Cdk from "../lib/cdk-stack";
import * as cdk from "@aws-cdk/core";

import {
  MatchStyle,
  expect as expectCDK,
  matchTemplate,
} from "@aws-cdk/assert";

/*
test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Cdk.CdkStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
*/
