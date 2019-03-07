import React, { Component } from 'react';
import './App.scss';
import DiscountForm from './DiscountForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uidDiscount: '00000000-0000-0000-0000000000000000',
      vchDiscountCode: 'deleteme',
      decDiscount: '5.00',
      booPercentage: '0',
      vchDiscountDescription: 'dev purposes',
      uidEvent: '',
      uidEventType: 'E45E2796-A916-6BD8-97619EBFDF81E3D6',
      intClubMemberType: [
        1024, 1, 2, 256, 512, 128, 64, 32, 16, 8, 4
      ],
      booRestrictFirstEvent: '0',
      sntQuantityAvailable: ' 1',
      sntMaxRedemptions: '1',
      mnyThresholdMin: '0.00',
      mnyDiscountMax: ' 5.00',
      dteStart: ' 03/06/1990',
      dteEnd: ' 03/07/1990',
      quantity: 51,
    };


  }

  // format { key : value }
  // merge data with currentState
  changedInput = (data) => {
    this.setState((prevState) => ({
      prevState,
      ...data
    }));
  }

  render() {
    const {
      changedInput
    } = this;

    return (
      <div className="App">

        <header>
          <h1>Bulk Discount Creator</h1>
          <p>Enter the amount of codes you wish to create. Then click "Submit"</p>
        </header>
        <main>
          <Tabs>
            <TabList>
              <Tab>Discount Codes</Tab>
              <Tab>Request</Tab>
              <Tab>Response</Tab>
              <Tab>Generated Codes</Tab>
            </TabList>

            <TabPanel>
              <DiscountForm data={this.state} onChange={changedInput} />
              <footer>
                <input type="submit" value="Submit Form"/>
              </footer>
            </TabPanel>
            <TabPanel>
              <pre>{ JSON.stringify(this.state, null, 2)}</pre>
            </TabPanel>
            <TabPanel>
              <h2>Response Fields</h2>
            </TabPanel>
            <TabPanel>
              <h2>Generated codes</h2>
            </TabPanel>
          </Tabs>
        </main>

        <footer className="credits">
          <p>Made By <a href="http://tomfordweb.com" target="_blank">Tom Ford</a> - <a href="mailto:tomfordweb@gmail.com">Support</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
