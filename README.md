
# stackdriver-event

  Submit `annotation` and `deploy` events to [StackDriver](http://www.stackdriver.com/).

  This helps annotating graphs so you can corelate movements to events.

## Example

```js
var submit = require('stackdriver-event')(API_KEY);

// simple

submit.annotation('increase disk space', function(err){
  // ...
});

submit.deploy('3560d7a', function(err){
  // ...
});

// or detailed

submit.annotation({
  message: 'increase disk space',
  annotated_by: 'Julian',
  level: 'INFO',
  instance_id: 'id'
}, function(err){
  // ...  
});

submit.deploy({
  revision_id: '3560d7a',
  deployed_by: 'Julian',
  deployed_to: 'production',
  repository: 'Debugger'
}, function(err){
  // ...  
});
```

## Installation

```bash
$ npm install stackdriver-event
```

## API

### Event(key)

  Create an event submitter instance with your api `key`.

### #annotation(data|message, fn)

  Submit an annotation event with `message` or `data` with those keys:

  - message (required)
  - annotated_by
  - level
  - instance_id
  - event_epoch

For more info, see [StackDriver Docs](http://feedback.stackdriver.com/knowledgebase/articles/260455-sending-annotation-events-to-stackdriver)

### #deploy(data|revision_id, fn)

  Submit an deploy event with `revision_id` or `data` with those keys:

  - revision_id (required)
  - deployed_by
  - deployed_to
  - repository

For more info, see [StackDriver Docs](http://feedback.stackdriver.com/knowledgebase/articles/260455-sending-annotation-events-to-stackdriver)

## License

  MIT

