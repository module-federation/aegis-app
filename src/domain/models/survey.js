import BaseDocumentType from './document-type'




// import datetime
// import requests
// from urllib.parse import urlparse
// from json import loads

// from lk.log import logger
// from lk.datastore import document, fields
// from lk.user.core import User
// from lk.api.core import KernelAPI
// from flask import request
// from lk.space.asset.core import ImageAsset

// from acn_1mw_backend.acn_1mw_utils import (get_steamliner_user_token, get_utc_now_str)


// class SurveyQuestion(document.DatastoreDocument):
//     question_copy = fields.StringField(max_length=140)
//     create_date = fields.StringField()
//     active = fields.BoolField(default=False)
//     author = fields.RefField(User)
//     week = fields.IntField()
//     year = fields.IntField()

//     def save(self, *args, **kwargs):
//         try:
//             access_token = request.headers['Authorization'].split(' ')[1]
//             self.author = list(User.find({'access_token': access_token}))[0]
//         except RuntimeError:
//             if not self.author:
//                 logger.error(f'The question\'s author cannot be found.')

//         if not self.create_date:
//             self.create_date = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')

//         super().save(*args, **kwargs)

//     def serialize_for_publish(self):
//         output = {
//             '_id': self._id,
//             'active': self.active,
//             'question_copy': self.question_copy,
//             'week': self.week,
//             'year': self.year
//         }
//         return output


// class SurveyResponse(document.DatastoreDocument):
//     active = fields.BoolField(default=True)
//     survey_question = fields.RefField(SurveyQuestion, id_field='question_id')
//     question_id = fields.StringField()
//     email = fields.StringField(required=True)
//     response_copy = fields.StringField(max_length=225)
//     name = fields.StringField()
//     employee_id = fields.StringField()
//     create_date = fields.StringField()

//     def save(self, *args, **kwargs):
//         user_questions = list(UserQuestionCount.find({'email': self.email, 'question_id': self.question_id}))
//         if len(user_questions) > 0:
//             user_questions[0].response_count = user_questions[0].response_count + 1
//             user_questions[0].save()
//         else:
//             rc = UserQuestionCount(email=self.email, question=self.question_id, response_count=1)
//             rc.save()

//         need_to_publish = False
//         if not self.create_date:
//             self.create_date = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
//             need_to_publish = True

//         super().save(*args, **kwargs)

//         if need_to_publish:
//             # publish a message for each new response
//             results = list(KernelAPI.find({'type': KernelAPI.type.default}))[0]
//             parsed = urlparse(results.baseurl)
//             api_messaging_url = f'{parsed.scheme}://{parsed.netloc}/rest/messaging/'
//             data = {'document_id': self._id,
//                     'document_type_name': 'survey_response',
//                     'target': 'led_wall',
//                     'allow_missing': True,
//                     'message_metadata': {'message_type': 'new_response'}
//                     }
//             # add bearer token to header
//             header = {'Authorization': 'Bearer ' + get_steamliner_user_token()}
//             # pass data to the messaging LK endpoint
//             req = requests.post(api_messaging_url, json=data, headers=header)
//             if req.status_code != 200:
//                 message = f'Publishing the Survey Response failed with the message: {loads(req.text)}'
//                 logger.error(message)
//             else:
//                 message = 'Published successfully'
//                 logger.debug(message)

//     def serialize_for_publish(self):
//         output = {
//             '_id': self._id,
//             'active': self.active,
//             'name': self.name,
//             'response_copy': self.response_copy,
//         }
//         return output


// class UserQuestionCount(document.DatastoreDocument):
//     email = fields.StringField()
//     survey_question = fields.RefField(SurveyQuestion, id_field='question_id')
//     question_id = fields.StringField()
//     response_count = fields.IntField()


// class Borough(document.DatastoreDocument):
//     name = fields.StringField()


// class Neighborhood(document.DatastoreDocument):
//     name = fields.StringField()
//     borough = fields.RefField(Borough)

//     def serialize_for_publish(self):
//         output = {
//             '_id': self._id,
//             'name': self.name
//         }
//         return output


// class CityStreamFeature(document.DatastoreDocument):
//     active = fields.BoolField()
//     header_copy = fields.StringField(max_length=60)
//     body_copy = fields.StringField(max_length=500)
//     attribution = fields.StringField(max_length=35)

//     def serialize_for_publish(self):
//         output = {
//             '_id': self._id,
//             'active': self.active,
//             'header_copy': self.header_copy,
//             'body_copy': self.body_copy,
//             'attribution': self.attribution,
//         }
//         return output


// class CityStreamSnippet(document.DatastoreDocument):
//     active = fields.BoolField()
//     header_copy = fields.StringField(max_length=35)
//     body_copy = fields.StringField(max_length=140)
//     category_icon = fields.StringField(max_length=16)
//     borough = fields.RefField(Borough)
//     neighborhood = fields.RefField(Neighborhood)

//     def serialize_for_publish(self):
//         output = {
//             '_id': self._id,
//             'active': self.active,
//             'body_copy': self.body_copy,
//             'header_copy': self.header_copy,
//             'category_icon': self.category_icon,
//             'borough': self.borough.serialize(),
//             'neighborhood': self.neighborhood.serialize_for_publish()
//         }
//         return output


// class PlaybackType(document.DatastoreDocument):
//     name = fields.StringField(default='Cycle')  # Cycle, Harmony Wall or City Stream


// class CycleRateType(document.DatastoreDocument):
//     name = fields.StringField()  # 2 hours, daily, weekly, monthly
//     cron_schedule = fields.StringField()


// class PlaybackOptions(document.DatastoreDocument):
//     playback_mode = fields.RefField(PlaybackType)
//     current_mode = fields.RefField(PlaybackType)  # used when type_of_playback is equals to 'Cycle'
//     last_time_modified = fields.StringField()
//     cycle_rate = fields.RefField(CycleRateType)

//     def serialize_for_publish(self):
//         return {'mode': self.current_mode.name}


// class PublishPayload(document.DatastoreDocument):
//     cityStreamFeatures = fields.ListField(list_of=fields.RefField(CityStreamFeature), default=list)
//     cityStreamSnippets = fields.ListField(list_of=fields.RefField(CityStreamSnippet), default=list)
//     harmonyWallResponses = fields.ListField(list_of=fields.RefField(SurveyResponse), default=list)
//     harmonyWallQuestion = fields.RefField(SurveyQuestion)

//     def serialize_for_publish(self):
//         data = {}
//         data.update({'cityStreamFeatures': [item.serialize_for_publish() for item in self.cityStreamFeatures]})
//         data.update({'cityStreamSnippets': [item.serialize_for_publish() for item in self.cityStreamSnippets]})
//         data.update({'harmonyWallResponses': [item.serialize_for_publish() for item in self.harmonyWallResponses]})
//         data.update({'harmonyWallQuestion': self.harmonyWallQuestion.serialize_for_publish()})
//         return data


// class LocalSupport(document.DatastoreDocument):
//     active = fields.BoolField(default=True)
//     showChatCode = fields.BoolField(default=True)
//     name = fields.StringField(max_length=60)
//     title = fields.StringField(max_length=60)
//     email = fields.StringField(max_length=128)


// class Location(document.DatastoreDocument):
//     name = fields.StringField(max_length=60)
//     url = fields.StringField(max_length=512)
//     roomId = fields.StringField(max_length=60)
//     floor = fields.StringField(max_length=60)
//     street1 = fields.StringField(max_length=60)
//     street2 = fields.StringField(max_length=60)
//     city = fields.StringField(max_length=60)
//     state = fields.StringField(max_length=60)
//     postcode = fields.StringField(max_length=60)


// class PointOfInterest(document.DatastoreDocument):
//     active = fields.BoolField(default=True)
//     featureOnDashboard = fields.BoolField(default=True)
//     poiType = fields.StringField(max_length=60)
//     title = fields.StringField(max_length=60)
//     shortContent = fields.StringField(max_length=512)
//     dashboardImage = fields.RefField(ImageAsset)
//     smallImage = fields.RefField(ImageAsset)
//     largeImage = fields.RefField(ImageAsset)
//     content = fields.ListField(
//         list_of=fields.DocumentField(
//             fields={'title': fields.StringField(max_length=60),
//                     'body': fields.StringField(max_length=512)}),
//         default=list)
//     location = fields.RefField(Location)


// class Event(document.DatastoreDocument):
//     active = fields.BoolField(default=True)
//     featureOnDashboard = fields.BoolField(default=True)
//     poiType = fields.StringField(max_length=60)
//     title = fields.StringField(max_length=60)
//     shortContent = fields.StringField(max_length=512)
//     start_datetime = fields.StringField(max_length=128)
//     end_datetime = fields.StringField(max_length=128)
//     dashboardImage = fields.RefField(ImageAsset)
//     smallImage = fields.RefField(ImageAsset)
//     largeImage = fields.RefField(ImageAsset)
//     content = fields.ListField(
//         list_of=fields.DocumentField(
//             fields={'title': fields.StringField(max_length=60),
//                     'body': fields.StringField(max_length=512)}),
//         default=list)
//     location = fields.RefField(Location)

// class MonitoredBase(document.DatastoreDocument):
//     _poly = {
//         'poly_on': 'type',
//     }
//     type = fields.StringField(default='base')
//     name = fields.StringField()
//     last_healthy = fields.StringField(default="1970-01-01T00:00:00Z")
//     first_healthy = fields.StringField(default="1970-01-01T00:00:00Z")
//     unhealthy_after = fields.IntField(default=180)

//     def isHealthy(self):
//         try:
//             last = datetime.datetime.strptime(self.last_healthy, "%Y-%m-%dT%H:%M:%S%z")
//             # weird double parsing b/c python is bad with timezones
//             now = datetime.datetime.strptime(datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"), "%Y-%m-%dT%H:%M:%S%z")
//             delta = now - last
//             return delta.seconds < self.unhealthy_after
//         except:
//             return False

// class MonitoredPage(MonitoredBase):
//     type = fields.StringField(default='page')

// class MonitoredService(MonitoredBase):
//     type = fields.StringField(default='service')
//     process_name = fields.StringField()
//     is_template = fields.BoolField(default=False)
//     # component = fields.RefField(document_type="acn_1mw_backend.document_types.service_monitor_component.ServiceMonitorComponent")
//     def __str__(self):
//         return f'MonitoredService monitoring {self.process_name} last healthy at {self.last_healthy}'

// class MonitoredServer(MonitoredBase):
//     type = fields.StringField(default='server')
//     url = fields.StringField()

// class Kiosk(document.DatastoreDocument):
//     name = fields.StringField(max_length=60)
//     location = fields.StringField(default="", max_length=60)
//     host = fields.RefField('lk.infrastructure.host:Host')
//     monitored_services = fields.ListField(list_of=fields.RefField(document_type=MonitoredService), default=list)
//     monitored_page = fields.RefField(document_type=MonitoredPage)
//     page_monitor = fields.RefField('acn_1mw_backend.document_types.page_monitor_component:PageMonitorComponent')
//     service_monitor = fields.RefField('acn_1mw_backend.document_types.service_monitor_component:ServiceMonitorComponent')

//     def ensureMonitoredPage(self):
//         # TODO if we migrate to messaging based data access update fetching here
//         if not self.monitored_page:
//             mp = MonitoredPage()
//             mp.name = f"{self.name}_MonitoredPage"
//             mp.save()
//             self.monitored_page = mp
//             self.save()

//     def ensureMonitorDefaultServices(self):
//         # TODO if we migrate to messaging based data access update fetching here
//         defaults = list(MonitoredService.find({'is_template':True}))
//         for service in defaults:
//             found = False
//             if self.monitored_services:
//                 for existing_service in self.monitored_services:
//                     if existing_service.name == service.name:
//                         found = True
//                         break
//             if found:
//                 continue
//             new_service = MonitoredService()
//             new_service.name = service.name
//             new_service.process_name = service.process_name
//             new_service.last_healthy = get_utc_now_str()
//             new_service.unhealthy_after = service.unhealthy_after
//             new_service.save()
//             self.monitored_services.append(new_service)
//         self.save()

//     def ensureDependencies(self):
//         self.ensureMonitoredPage()
//         self.ensureMonitorDefaultServices()

//     def delete(self, *args, **kwargs):
//         self.monitored_page.delete()
//         for service in self.monitored_services:
//             service.delete()
//         super().delete(*args, **kwargs)