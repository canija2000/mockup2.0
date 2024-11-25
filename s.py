
import json 
import numpy as np

# some JSON:

with open('cursos.json') as f:
  data = json.load(f)

# parse x:

for i in data:
  i['type'] = np.random.randint(0,5)
  i['weeklyData'] = [round(i['hpw']*np.random.random(),1) + i['hpw'] for j in range(16)]
  i['weeklyData'] = [round(i,1) for i in i['weeklyData']]

with open('cursos3.json', 'a') as f:
  json.dump(data, f, indent=2)