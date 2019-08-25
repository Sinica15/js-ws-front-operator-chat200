
export function personsSorting(persons, sortParams) {
    let outPersonsArr = persons;
    if (sortParams.search.length > 0)
        outPersonsArr = persons.filter(person => person.nick.toLowerCase().indexOf(sortParams.search) >= 0);

    // console.log(outPersonsArr.filter(person => person._type == 'client' && person.currentStatus == 'free'));

    switch (sortParams.select) {
        case 'free users' :
            return outPersonsArr.filter(person => person.currentStatus == 'free');
        case 'free clients' :
            return outPersonsArr.filter(person => person.currentStatus == 'free' && person._type == 'client');
        case 'free operators' :
            return outPersonsArr.filter(person => person.currentStatus == 'free' && person._type == 'operator');
        default :
            return outPersonsArr;
    }
}