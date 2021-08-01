# Relational Database Management Systems
Ref: https://github.com/thoughtworks-jumpstart/jumpstart/blob/master/back-end-web-development/introduction_to_relational_database.md

## Introduction
- RDBMS
- SQL

## Concepts of Relational Database

* Concepts
  * Table/Row/Column
  * Schema
    * Schema Migration
  * Primary Key, Foreign Key
  * [View](https://ecomputernotes.com/fundamental/what-is-a-database/what-is-a-database-view)
  * [Index](https://8thlight.com/blog/kyle-annen/2018/10/09/an-introduction-to-database-indexing.html)
  * SQL Query
    * Selection
    * Join
  * Transactions
    * ACID property
  * Lock

  ### Data Modelling (Schema?)
  - Ref: https://github.com/thoughtworks-jumpstart/jumpstart/blob/master/back-end-web-development/introduction_to_relational_database.md#database-modeling

  - **Primary Key**
  - **Entity Integrity Rule** 
    https://github.com/thoughtworks-jumpstart/jumpstart/blob/master/back-end-web-development/introduction_to_relational_database.md#integrity-rules-for-database-modelling-and-design
  
  ### Relationship
  - **Primary Key + Foreign Key**
    https://github.com/thoughtworks-jumpstart/jumpstart/blob/master/back-end-web-development/introduction_to_relational_database.md#creating-relationship-among-tables
  - **Referential Integrity Rule**
    https://github.com/thoughtworks-jumpstart/jumpstart/blob/master/back-end-web-development/introduction_to_relational_database.md#integrity-rules-for-database-modelling-and-design

  ## Best Practices
  - **Normalization**
    https://github.com/thoughtworks-jumpstart/jumpstart/blob/master/back-end-web-development/introduction_to_relational_database.md#normalization
  - [ACID](https://medium.com/@singhal.amogh1995/breaking-down-acid-and-transactions-in-databases-cd206db7dd8b)
    - Atomaticity
    - Consistency
    - Isolation
    - Durability

  ## ACID properties and Locks
  - [Transaction Processing in PostgreSQL](https://www.postgresql.org/files/developer/transactions.pdf)
  - [ACID Compliance](https://mariadb.com/resources/blog/acid-compliance-what-it-means-and-why-you-should-care)
  - [Database Locking: What it is, Why it Matters and What to do About it](https://www.methodsandtools.com/archive/archive.php?id=83)
  - Database locking techniques + different level of locking: https://www.programmerinterview.com/database-sql/database-locking/
  - https://rspacesamuel.medium.com/consistency-concurrency-a-study-of-oracle-and-sql-server-899e6d758271
  - https://database.guide/what-is-acid-in-databases/
  - https://medium.com/@singhal.amogh1995/breaking-down-acid-and-transactions-in-databases-cd206db7dd8b