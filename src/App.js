import React, { Component } from 'react';
import './App.scss';
import DiscountForm from './DiscountForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";






export default function App () {
  return (
    <div className="App">
        <header>
          <h1>Bulk Discount Creator</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, debitis voluptatum dicta pariatur deserunt blanditiis impedit nesciunt minima quia recusandae voluptatibus saepe nam numquam, nemo autem repellat excepturi repellendus. Nisi.</p>
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
              <DiscountForm />
              <footer>
              </footer>
            </TabPanel>
            <TabPanel>
              <pre></pre>
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
  )
}
