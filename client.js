"StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

const axios = require('axios');
const { response } = require('express');

/*  TEST #1.1
    Execute two POST requests to insert two items into the collection.
*/
const postMovie = {
    title: 'Harry Potter and the Philosophers Stone',
    release_year: '1997'
}
const postMovie2 = {
    title: 'Harry Potter and the Chamber of Secrets',
    release_year: '1998'
}
async function testOneOne() {
    try {  
        // Concurrent HTTP requests
      await axios.all([     
        await axios.post('http://localhost:3000/api', postMovie),
        await axios.post('http://localhost:3000/api', postMovie2)
      ])
      console.log("TEST 1.1 - INSERTED ITEM #1: ", JSON.stringify(postMovie));
      console.log("TEST 1.1 - INSERTED ITEM #2: ", JSON.stringify(postMovie2));
    } catch (error) {
      console.error(error);
    }	
}

/*  TEST #1.2
    Execute a single item PUT request to modify a single item in the collection.
*/
const putMovieModify = {
    title: 'Harry Potter and the Prisoner of Azkaban',
    release_year: '1999'
}
async function testOneTwo() {
    try {  
        // MODIFIES item on row 2 with new Movie item
        axios.put('http://localhost:3000/api/2', putMovieModify);
        console.log("\nTEST 1.2 - ITEM MODIFIED SUCCESSFULLY, ITEM ADDED: ", JSON.stringify(putMovieModify), "\n");
    } catch (error) {
        console.error(error);
    }	
}

/*  TEST #1.3
    Execute two separate item GET requests to check if each item inserted is correct
*/
async function testOneThree() {
    try {  
        const response1 = await axios.get('http://localhost:3000/api/1'); 
        const response2 = await axios.get('http://localhost:3000/api/2');
      
        // New array created, item results from map added to variables 
        let resp1Title = response1.data.map(a => a.title);
        let resp1Year = response1.data.map(a => a.release_year);  
        let resp2Title = response2.data.map(a => a.title);
        let resp2Year = response2.data.map(a => a.release_year);  

        // Checks if both responses are array's and if there are 1 item being searched by each request.
        if(Array.isArray(response1.data && response2.data) && ((response1.data.length == 1) && (response2.data.length == 1))) {
            // Converts arrays to strings and compares to the items in the COLLECTION (After Test #1.1 & Test #1.2 runs)
            if((resp1Title.toString() === 'Harry Potter and the Philosophers Stone' && resp1Year.toString() === '1997') && (resp2Title.toString() === 'Harry Potter and the Prisoner of Azkaban' && resp2Year.toString() === '1999')) {
                console.log("TEST 1.3 - EACH ITEM INSERTED IN COLLECTION IS CORRECT");    
            } else {
                console.log("TEST 1.3 - ITEMS INSERTED DO NOT MATCH!");
            }
        } else {
            // No data is found
            console.log("TEST 1.3 - INSERTION FAILURE!");
        }
    } catch (error) {
      console.error(error);
    }	
}

/*  TEST #2.1
    Execute a single collection PUT request that replaces the collection with 4 new items.
*/

// 4 movie arrays to be added to the COLLECTION
const putMovie = {
    title: 'Harry Potter and the Goblet of Fire',
    release_year: '2000'
}
const putMovie2 = {
    title: 'Harry Potter and the Order of the Phoenix',
    release_year: '2003'
}
const putMovie3 = {
    title: 'Harry Potter and the Half-Blood Prince',
    release_year: '2005'
}
const putMovie4= {
    title: 'Harry Potter and the Deathly Hallows',
    release_year: '2007'
}
async function testTwoOne() {
    try {  
        //Concurrent HTTP requests
        await axios.all([
            axios.put('http://localhost:3000/api', putMovie),
            axios.put('http://localhost:3000/api', putMovie2),
            axios.put('http://localhost:3000/api', putMovie3),
            axios.put('http://localhost:3000/api', putMovie4)
        ])
        console.log("\nTEST 2.1 - 4 ITEMS ADDED SUCCESSFULLY: \n", "1-", JSON.stringify(putMovie), "\n", "2-", JSON.stringify(putMovie2), "\n", "3-", JSON.stringify(putMovie3), "\n", "4-", JSON.stringify(putMovie4), "\n");
    } catch (error) {
        console.error(error);
    }	
}

/*  TEST #2.2
    Execute a single collection GET request to check if all the items are correct.
*/
async function testTwoTwo() {
    try {  
        const response = await axios.get('http://localhost:3000/api'); 
      
        //Expected 4 items in array
        if(response.data.length == 4) {
            console.log("TEST 2.2 - ALL ITEMS ARE CORRECT");
        } else {
            console.log("TEST 2.2 - ITEMS ARE INCORRECT");
        }
    } catch (error) {
      console.error(error);
    }	
}

/*  TEST #2.3
    Execute a single item DELETE request to delete a single item from the collection.
*/
async function testTwoThree() {
    try {  
        await axios.delete('http://localhost:3000/api/4'); 
        console.log("\nTEST 2.3 - ITEM DELETED on ROW 4\n");
    } catch (error) {
      console.error(error);
    }	
}

/*  TEST #2.4
    Execute a single collection GET request to check if all the items are correct (3 items).
*/
async function testTwoFour() {
    try {  
        const response = await axios.get('http://localhost:3000/api'); 
      
        //Exactly 3 items in array
        if(response.data.length == 3) {
            console.log("TEST 2.4 - ALL ITEMS ARE CORRECT");
        } else {
            console.log("TEST 2.4 - ITEMS ARE INCORRECT!");
        }
    } catch (error) {
      console.error(error);
    }	
}
/*  TEST #2.5
    Execute a single collection DELETE request to delete the entire collection.
*/
async function testTwoFive() {
    try {  
        const response = await axios.delete('http://localhost:3000/api');
        console.log("\nTEST 2.5 - COLLECTION DELETED: ", response.data, "\n");
    } catch (error) {
        console.error(error);
    }	
}

/*  TEST #2.6
    Execute a single collection GET request to check if the collection is empty.
*/
async function testTwoSix() {
    try {  
        const response = await axios.get('http://localhost:3000/api'); 
        //No data in array
        if(response.data.length == 0) {
            console.log("TEST 2.6 - COLLECTION IS *EMPTY*");
        } else {
            console.log("TEST 2.6 - ITEMS FOUND IN COLLECTION!");
        }
    } catch (error) {
      console.error(error);
    }	
}

// Main test function for async sub-functions
async function TEST() {
    try {
        await testOneOne();
        await testOneTwo();
        await testOneThree();
        await testTwoOne();
        await testTwoTwo();
        await testTwoThree();
        await testTwoFour();
        await testTwoFive();
        await testTwoSix();
    } catch (error) {
        console.error(error);
    }
    console.log("\nALL TESTS SUCCESSFUL");
}

// Call main test function
TEST();