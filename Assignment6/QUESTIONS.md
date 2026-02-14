Row by Row
Parse the row. Check the name. 
    strip content

If mailbox exists
    push into its respective mailbox
else
    create mailbox
    w name and mail
    push into mailbox

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