import evelink.api

corpID = 98414469 # ID of the corporation.

api = evelink.api.API()
corp = evelink.corp.Corp(api)
response = corp.corporation_sheet(corpID)

print(evelink.api.get_named_value("ceo", "id"))
