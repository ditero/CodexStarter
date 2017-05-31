CodeX  <<-->> Steltix Labs Workshop
===================


## Customers Persona 

- Joan is a Customer Relationship Manager for a large distribution company that buys and resells thousands of stock items to a wide range of international customers. It is essential for her to be able to have visibility over the types of business relationships that she is managing for her Enterprise company.  She would like to see the address book data visualized in a way that makes it easy for her to see these catagories of relationship. She is not very technical but would like a dashboard to see the customer data as easy as possible. She has given the following pointers 
* the relevant data exists in the JDE Address Book Master (F0101) table 
* The Column AT1 (search type) tells her what catagory of relationship her company has with each address book entry
* C = customer, O = opportunity, P = prospect, V = supplier, D = competitor, W = warehouse
* The Column ALPH (Alpha Name) holds the human readable name for the company. 


## Items Persona 

- Steve is a Warehouse Manager for a company that makes and ships sporting goods. His company carries a wide range of products and he needs to always be aware of how many items they offer in each class or product. He would like to have a nice easy way to see the number of products that his company carries in each class. Steve is very technical and like to see lots of the Category codes for each item even though these values seem strange. He has supplied the following request - 
* the Items data in JDE is located in the Item Master table (F4101)
* the Column PRP7 (Commodity Sub Class) holds the infomation of how the products should be grouped together.  
* He is only interested in items that are in the SPORTS class
* He would love to see the following Columns somehow in his dashboard
*  UOM1 , ITM, AITM, BPFG, STKT, ALN

#### Notes

* main javascript file is /js/main.js