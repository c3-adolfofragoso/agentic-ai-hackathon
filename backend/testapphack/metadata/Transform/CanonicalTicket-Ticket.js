data = {
    name: 'CanonicalTicket-Ticket',
    source: 'CanonicalTicket',
    target: 'Ticket',
    projection: {
        id: id,
        name: summary,
        summary: summary,
        engineer: {
            id: assignee
        },
        project: {
            id: parent
        },
        status: status,
        priority: 0.2,
        jiraLink: 'placeholder'

    }
};
