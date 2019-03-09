import React from 'react';
import './App.scss';
import DiscountForm from './DiscountForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import DiscountList from './DiscountList';

export default function App () {
  return (
    <div className="App">
        <header>
        <h1>Bulk Discount Creator</h1>
        </header>
        <main>
          <Tabs>
            <TabList>
              <Tab>Discount Codes</Tab>
              <Tab>Generated Codes</Tab>
            </TabList>
            <TabPanel>
              <p>Enter the quantity, value, and description for the coupon codes.</p>
              <DiscountForm  />
              <footer>
              </footer>
            </TabPanel>
            <TabPanel>
              <DiscountList />
            </TabPanel>
          </Tabs>
        </main>
        <footer className="credits">
          <p>Made By <a href="http://tomfordweb.com" target="_blank" rel="noopener noreferrer">Tom Ford</a> - <a href="https://github.com/tomfordweb/SBR-Discounts" target="_blank" rel="noopener noreferrer">github</a></p>
        </footer>
      </div>
  )
}
