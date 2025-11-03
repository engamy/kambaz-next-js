import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">


    <h1>Amy Eng | Section 01</h1>
        <a href="https://github.com/engamy/kambaz-next-js" target="_blank" id="wd-github">
        <p>Github repository link</p>
        </a>
        
     <h1>Labs</h1>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link> </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link> </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link> </li>
       <li>
         <Link href="/Labs/Lab4" id="wd-lab4-link">
           Lab 4: Managing State </Link> </li>
       <li>
         <Link href="/Labs/Lab5" id="wd-lab5-link">
           Lab 5: Implementing RESTful Web APIs with Express.js </Link> </li>
     </ul>
   </div>
 );}
