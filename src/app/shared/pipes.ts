import {Observable, Subject} from 'rxjs';
import {DataHolder} from './models/data-holder';
import {BaseError} from './models/errors';


/**
 * Custom RxJs pipe to handle emitting to Subjects with DataHolder type
 * It subscribe to the input Observable and emit the value to the Subject
 * And in case of an error it pass it to the DataHolder error field and emit it to
 * the subject to keep it alive instead of calling .error() on the subject which
 * will kill it and unsubscribe all the subscribers preventing it
 * from emitting values anymore
 * @param subject subject to emit the input observable value to it
 * @param unDeclaredErrHandler returns an Error type which will be
 * used to instead of any unDeclared (not thrown explicitly) Errors
 */
export function emitToDataHolderSubject<T>(subject: Subject<DataHolder<T>>, unDeclaredErrHandler?: (err,srcObservable: Observable<DataHolder<T>>)=>BaseError ): (srcObservable: Observable<DataHolder<T>>) => Observable<DataHolder<T>> {
  return function(srcObservable: Observable<DataHolder<T>>): Observable<DataHolder<T>> {
    return new Observable(subscriber => {
      srcObservable.subscribe(val => {
          subscriber.next(val);
          subject.next(val);
        },
        err => {
          subscriber.error(err);
          if (!(err instanceof BaseError) && unDeclaredErrHandler) {
            subject.next(DataHolder.error(unDeclaredErrHandler(err, srcObservable)));
          } else {
            subject.next(DataHolder.error(err)) ;
          }

        },
        () => {
          subscriber.complete();
        });
      return () => subscriber.unsubscribe();
    });
  };
}

