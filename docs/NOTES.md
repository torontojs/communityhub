# Assorted Notes

## Model schema relationships

From slack:

Data relationship looks like this:

![data schema diagram, described below](./assets/data-schema.svg)

> A **profile** is a core unit and can exist standalone. Someone registers, they have a profile, as simple as that.
> _For example_, [Alice and Bob](https://en.wikipedia.org/wiki/Alice_and_Bob) just filled their profiles. Alice just moved to Toronto and was googling for groups to join, found us and decided to volunteer. Bob has attended a couple events and decided it would be cool to volunteer.
>
> A **team** is also standalone, it can be a new team just created without any people in it yet.
> _For example_, say we have a need for a team that will be responsible for running charity campaigns on Christmas, it is the "Grinch Team".
> We create the team on the VMS but there are no people on it just yet. This is when we send messages and talk to people saying we need volunteers to run the team.
> So the team exists standalone, but has no people in it.
>
> A **role** is the association between a profile and a team. It is created when we associate the two.
> _For example_, Alice is very proactive and has availability to run the Grinch Team as an organizer for 2 years.
> Bob on the other hand has just a break before starting school in March, so he can only join the Grinch Team for this season.
> We create a role entry for Alice and one for Bob, when the time passes and they are not on the role anymore, this entry is removed, as the roles are not active anymore.
>
> Then the **event log** is every "things that happens". It is standalone as well and has references for every other schema.
> _For example_, those things create event log entries:
>
> 1. Alice fills her profile
> 2. Bob fills his profile
> 3. Grinch Team is created
> 4. Alice volunteers for Grinch Team (create role)
> 5. Bob volunteers for Grinch Team (create role)
> 6. Bob ends his volunteering for Grinch Team (remove role)
> 7. Alice ends her volunteering for Grinch Team (remove role)
>
> In the future, we want to have a timeline of events containing all entries from the event log associated with a team or a profile, so if someone visits Alice's page they will see:
>
> 1. Alice created her profile
> 2. Alice volunteers for Grinch Team (create role)
> 3. Alice ends her volunteering for Grinch Team (remove role)
