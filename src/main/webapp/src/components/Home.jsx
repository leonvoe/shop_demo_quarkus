import React, { Component } from "react";

import {
  PageSection,
  TextContent,
  Text,
  PageSectionVariants,
  Link,
} from "@patternfly/react-core";

class Home extends Component {
  render() {
    return (
      <div>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Home</Text>
            <Text component="p">
              Navigate yourself through a web-application built with a
              Patternfly (React) Frontend and a Quarkus Backend.
            </Text>
            <Text component="p">
              Start out by clicking at the top-left corner and one of the shown
              links, and navigate yourself through the Website.
            </Text>
          </TextContent>
        </PageSection>
      </div>
    );
  }
}

export default Home;
