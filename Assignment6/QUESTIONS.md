Parse the row. Check the name. 

If mailbox exists
    send it into its respective mailbox
    strip content
else
    create mailbox
    w name and mail
    parse mail, remove its content

POST

Take in request
View Request
add a new field named {
    id: generateUUID
    from-name: CSE186 Student
    from-email: CSE186student@ucsc.edu
    sent: time
    recieved: time
}