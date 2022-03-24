# Youtube Channels Explorer

## Libraries and Dependencies used
`-SCSS:` More functionality and features then regular CSS

`-AngularMaterial:` Used for simplicity, easy-to-use and Great UI/UX.

`-MomentJs` Used for calculating videos duration from iso-8601 format.

`-NgxContentLoader:` Used to make a Skeleton Screens Loading.

`-AngularFire:` For easy working with Firebase FireStore

## Custom Classes

`-DataHolder:` Used as a container to emitted data to a subject and errors at the same time
because in case of an error the subject stream will be killed and will not be able to emit
more values.
So we pass the error in the DataHolder object to keep the subject stream alive.

`-BaseError:` Base Error class which all custom errors will extend from,
 because it has a workaround implementation to allow extending native JS Error class correctly.
 
## Errors Handling

Error are handled by creating a custom Error class with user-friendly error message,
Then throw it instead of developer-friendly errors 

##The Application Main Flow
When loading the home page it starts by trying to get the default channel `LinusTechTips` uploaded videos
from local storage if found it gets emitted to a BehaviorSubject which the home page already subscribed to it.
If the channel's videos are not found then it fetch them from Youtube API then save it in the local storage
then emit it to the BehaviorSubject.

Upon clicking on a video to show it's details, it fetches the video details from Youtube API and
Saved personal attributes about the video (Personal Rating and If it's a favorite video) from 
Firebase Firestore DB at the same time
then combine the result of both calls in one object and emit it to the VideoDetails page component

When typing a search title in the header component it waits 500ms as a delay after the user
stops typing then passes it to the home component by emitting it to a BehaviourSubject in VideosService
which the Home page component subscribed to.

When submitting a new channelId or username it works exactly the same as retrieving videos of the 
default channel, in addition to a validation for the input to check if it is a channelId or username
and pass it to the correct parameter for the Youtube API.

## General Decisions and Notes

-All components and services are in the AppModule due to the small app size and it's simplicity
and there is no need to split them into multiple modules

-All AngularMaterial components are grouped in one module by importing and re-exporting them in that module, then import the module in the AppModule.
Which make things more organized and reduce the clutter in the AppModule

-BehaviorSubjects are used because they retain the last emitted value, which is useful because they can be  pre-loaded with an http response (for example),  and then emit it to any component subscribes to it later on
when needed.

-JavaScript minification using gulp or grunt is not necessary because AngularCLI/Webpack take care of it when compiling in "prod" mode

-Static methods in some of the services is just a convention to indicate that they are helper/utility methods and not tied to the service instance.
They are private by default and can be changed to public when necessary.
