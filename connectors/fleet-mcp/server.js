const VEHICLES = [
  { vehicle_id: 'VH-001', plate: '312-YK', driver: 'Yossi Cohen', type: 'truck', status: 'moving', position: { lng: 34.7918, lat: 32.0853 }, speed: 85, heading: 180, fuel: 72, odometer: 45200 },
  { vehicle_id: 'VH-002', plate: '448-BT', driver: 'David Levy', type: 'van', status: 'idle', position: { lng: 34.7650, lat: 32.0950 }, speed: 0, heading: 90, fuel: 45, odometer: 67800 },
  { vehicle_id: 'VH-003', plate: '485-AB', driver: 'Sarah Mizrahi', type: 'truck', status: 'moving', position: { lng: 34.7890, lat: 32.0700 }, speed: 65, heading: 220, fuel: 88, odometer: 32100 },
  { vehicle_id: 'VH-004', plate: '629-DM', driver: 'Avi Ben-David', type: 'car', status: 'moving', position: { lng: 34.8200, lat: 32.0850 }, speed: 50, heading: 270, fuel: 60, odometer: 89400 },
  { vehicle_id: 'VH-005', plate: '773-RF', driver: 'Rachel Goldstein', type: 'motorcycle', status: 'idle', position: { lng: 34.7800, lat: 32.0853 }, speed: 0, heading: 0, fuel: 90, odometer: 12300 },
  { vehicle_id: 'VH-006', plate: '195-GH', driver: 'Moshe Peretz', type: 'truck', status: 'alert', position: { lng: 34.7680, lat: 32.0880 }, speed: 0, heading: 45, fuel: 12, odometer: 102000 },
  { vehicle_id: 'VH-007', plate: '841-NP', driver: 'Tamar Shapira', type: 'van', status: 'moving', position: { lng: 34.8100, lat: 32.0830 }, speed: 125, heading: 160, fuel: 55, odometer: 54700 },
  { vehicle_id: 'VH-008', plate: '356-WQ', driver: 'Eli Dahan', type: 'car', status: 'idle', position: { lng: 34.7900, lat: 32.0790 }, speed: 0, heading: 300, fuel: 78, odometer: 28900 },
  { vehicle_id: 'VH-009', plate: '502-JL', driver: 'Noa Friedman', type: 'motorcycle', status: 'moving', position: { lng: 34.7850, lat: 32.0900 }, speed: 40, heading: 10, fuel: 65, odometer: 8700 },
  { vehicle_id: 'VH-010', plate: '667-CT', driver: 'Oren Avraham', type: 'truck', status: 'idle', position: { lng: 34.7800, lat: 32.0770 }, speed: 0, heading: 135, fuel: 34, odometer: 78200 },
  { vehicle_id: 'VH-011', plate: '914-EX', driver: 'Michal Katz', type: 'van', status: 'moving', position: { lng: 34.7700, lat: 32.0750 }, speed: 72, heading: 200, fuel: 50, odometer: 41500 },
  { vehicle_id: 'VH-012', plate: '238-SV', driver: 'Amit Rosen', type: 'car', status: 'alert', position: { lng: 34.7950, lat: 32.1000 }, speed: 0, heading: 90, fuel: 8, odometer: 95600 },
  { vehicle_id: 'VH-013', plate: '581-KZ', driver: 'Yael Schwartz', type: 'motorcycle', status: 'moving', position: { lng: 34.8000, lat: 32.1050 }, speed: 55, heading: 350, fuel: 82, odometer: 15800 },
  { vehicle_id: 'VH-014', plate: '726-MR', driver: 'Dan Agmon', type: 'truck', status: 'idle', position: { lng: 34.8050, lat: 32.1080 }, speed: 0, heading: 260, fuel: 42, odometer: 63400 },
  { vehicle_id: 'VH-015', plate: '149-UP', driver: 'Liat Baruch', type: 'van', status: 'moving', position: { lng: 34.7875, lat: 32.0620 }, speed: 90, heading: 180, fuel: 67, odometer: 37200 },
];

const GEOFENCES = [
  { id: 'GF-001', name: 'Tel Aviv Depot', center: [34.7818, 32.0853], radius: 500 },
  { id: 'GF-002', name: 'Herzliya Industrial', center: [34.8050, 32.1080], radius: 800 },
  { id: 'GF-003', name: 'Rishon Restricted', center: [34.7850, 32.0460], radius: 600 },
  { id: 'GF-004', name: 'Ramat Gan Hub', center: [34.8100, 32.0830], radius: 400 },
];

const TRIPS = [
  { trip_id: 'TR-0001', vehicle_id: 'VH-001', driver: 'Yossi Cohen', status: 'in_progress', origin: 'Tel Aviv Port', destination: 'Haifa', distance_km: 95, progress: 45 },
  { trip_id: 'TR-0002', vehicle_id: 'VH-003', driver: 'Sarah Mizrahi', status: 'in_progress', origin: 'Ramat Gan', destination: 'Jerusalem', distance_km: 60, progress: 72 },
  { trip_id: 'TR-0003', vehicle_id: 'VH-004', driver: 'Avi Ben-David', status: 'in_progress', origin: 'Herzliya', destination: 'Ashdod', distance_km: 45, progress: 30 },
  { trip_id: 'TR-0004', vehicle_id: 'VH-007', driver: 'Tamar Shapira', status: 'completed', origin: 'Rishon LeZion', destination: 'Netanya', distance_km: 80, progress: 100 },
  { trip_id: 'TR-0005', vehicle_id: 'VH-011', driver: 'Michal Katz', status: 'completed', origin: 'Petah Tikva', destination: 'Haifa', distance_km: 110, progress: 100 },
  { trip_id: 'TR-0006', vehicle_id: 'VH-005', driver: 'Rachel Goldstein', status: 'scheduled', origin: 'Tel Aviv Port', destination: 'Beer Sheva', distance_km: 120, progress: 0 },
];

let tripCounter = 7;
function now() { return new Date().toISOString(); }

const TOOLS = {
  'vehicle.get': { description: 'Get real-time data for a specific vehicle.', inputSchema: { type: 'object', properties: { vehicle_id: { type: 'string', description: 'Vehicle ID (e.g. VH-003)' } }, required: ['vehicle_id'] } },
  'vehicles.list': { description: 'List all vehicles with optional filters.', inputSchema: { type: 'object', properties: { status: { type: 'string', description: 'Filter: moving, idle, alert' }, type: { type: 'string', description: 'Filter: truck, van, car, motorcycle' }, limit: { type: 'number', description: 'Max results' } } } },
  'geofence.check': { description: 'Check geofence compliance. Returns violations.', inputSchema: { type: 'object', properties: { vehicle_id: { type: 'string' }, geofence_id: { type: 'string' } } } },
  'trip.create': { description: 'Create a trip assignment.', inputSchema: { type: 'object', properties: { vehicle_id: { type: 'string' }, origin: { type: 'string' }, destination: { type: 'string' } }, required: ['vehicle_id', 'origin', 'destination'] } },
  'route.optimize': { description: 'Calculate optimal route.', inputSchema: { type: 'object', properties: { vehicle_id: { type: 'string' }, destination: { type: 'string' }, optimize_for: { type: 'string' } }, required: ['vehicle_id', 'destination'] } },
  'route.suggest': { description: 'Suggest route alternatives.', inputSchema: { type: 'object', properties: { origin: { type: 'string' }, destination: { type: 'string' } }, required: ['origin', 'destination'] } },
  'safety.alerts': { description: 'Get safety alerts.', inputSchema: { type: 'object', properties: { vehicle_id: { type: 'string' }, severity: { type: 'string' }, limit: { type: 'number' } } } },
  'safety.score': { description: 'Calculate driver safety score.', inputSchema: { type: 'object', properties: { driver_name: { type: 'string' }, vehicle_id: { type: 'string' }, period_days: { type: 'number' } } } },
  'ui.listPlugins': { description: 'List available UI plugins.', inputSchema: { type: 'object', properties: {} } },
  'ui.getPlugin': { description: 'Get manifest for a specific UI plugin.', inputSchema: { type: 'object', properties: { plugin_id: { type: 'string', description: 'Plugin ID' } }, required: ['plugin_id'] } },
};

function handleToolCall(name, args) {
  var result;
  switch (name) {
    case 'vehicle.get': { var v = VEHICLES.find(function(x) { return x.vehicle_id === args.vehicle_id; }); if (!v) { result = { error: 'Vehicle not found: ' + args.vehicle_id }; break; } result = JSON.parse(JSON.stringify(v)); result.last_update = now(); break; }
    case 'vehicles.list': { var list = VEHICLES.slice(); if (args.status) list = list.filter(function(v) { return v.status === args.status; }); if (args.type) list = list.filter(function(v) { return v.type === args.type; }); list = list.slice(0, args.limit || 50); result = { vehicles: list.map(function(v) { return { vehicle_id: v.vehicle_id, plate: v.plate, driver: v.driver, type: v.type, status: v.status, speed: v.speed, fuel: v.fuel }; }), total: list.length }; break; }
    case 'geofence.check': { var violations = []; var vehiclesToCheck = args.vehicle_id ? VEHICLES.filter(function(v) { return v.vehicle_id === args.vehicle_id; }) : VEHICLES; var fences = args.geofence_id ? GEOFENCES.filter(function(g) { return g.id === args.geofence_id; }) : GEOFENCES; for (var i = 0; i < vehiclesToCheck.length; i++) { var v = vehiclesToCheck[i]; for (var j = 0; j < fences.length; j++) { var gf = fences[j]; var dist = Math.sqrt(Math.pow((v.position.lng - gf.center[0]) * 111320 * Math.cos(gf.center[1] * Math.PI / 180), 2) + Math.pow((v.position.lat - gf.center[1]) * 110540, 2)); if (dist > gf.radius * 2) { violations.push({ vehicle_id: v.vehicle_id, geofence: gf.name, geofence_id: gf.id, distance_meters: Math.round(dist), since: now() }); } } } result = { total_vehicles: vehiclesToCheck.length, in_zone: vehiclesToCheck.length - violations.length, violations: violations }; break; }
    case 'trip.create': { var v = VEHICLES.find(function(x) { return x.vehicle_id === args.vehicle_id; }); if (!v) { result = { error: 'Vehicle not found' }; break; } if (v.status === 'alert') { result = { error: 'Cannot assign trips to vehicles with active alerts' }; break; } var trip = { trip_id: 'TR-' + String(tripCounter++).padStart(4, '0'), vehicle_id: args.vehicle_id, driver: v.driver, status: 'scheduled', origin: args.origin, destination: args.destination, estimated_duration_min: Math.round(30 + Math.random() * 90), distance_km: Math.round(20 + Math.random() * 150) }; TRIPS.push(trip); result = trip; break; }
    case 'route.optimize': { var v = VEHICLES.find(function(x) { return x.vehicle_id === args.vehicle_id; }); if (!v) { result = { error: 'Vehicle not found' }; break; } var distKm = Math.round(30 + Math.random() * 120); result = { route_id: 'RT-' + String(Math.floor(Math.random() * 9000 + 1000)), vehicle_id: args.vehicle_id, origin: { lng: v.position.lng, lat: v.position.lat }, destination: args.destination, optimize_for: args.optimize_for || 'time', distance_km: distKm, estimated_time_min: Math.round(distKm * 0.8 + Math.random() * 20), fuel_estimate_liters: Math.round(distKm * 0.12 * 10) / 10 }; break; }
    case 'route.suggest': { var base = Math.round(30 + Math.random() * 100); result = [ { route: 'Highway 2 (Coastal)', distance_km: base, estimated_time_min: Math.round(base * 0.7), fuel_liters: Math.round(base * 0.11 * 10) / 10, traffic: 'moderate' }, { route: 'Highway 4 (Geha)', distance_km: base + 8, estimated_time_min: Math.round((base + 8) * 0.65), fuel_liters: Math.round((base + 8) * 0.10 * 10) / 10, traffic: 'light' }, { route: 'Route 40 (Ayalon)', distance_km: base - 5, estimated_time_min: Math.round((base - 5) * 0.9), fuel_liters: Math.round((base - 5) * 0.13 * 10) / 10, traffic: 'heavy' } ]; break; }
    case 'safety.alerts': { var alerts = [ { type: 'speeding', severity: 'high', vehicle_id: 'VH-007', driver: 'Tamar Shapira', speed: 125, limit: 90, time: now() }, { type: 'harsh_brake', severity: 'medium', vehicle_id: 'VH-003', driver: 'Sarah Mizrahi', deceleration: -8.5, time: now() }, { type: 'geofence_exit', severity: 'high', vehicle_id: 'VH-012', driver: 'Amit Rosen', geofence: 'Tel Aviv Depot', time: now() }, { type: 'low_fuel', severity: 'low', vehicle_id: 'VH-006', driver: 'Moshe Peretz', fuel_level: 12, time: now() }, { type: 'speeding', severity: 'medium', vehicle_id: 'VH-015', driver: 'Liat Baruch', speed: 105, limit: 90, time: now() }, { type: 'sos', severity: 'critical', vehicle_id: 'VH-006', driver: 'Moshe Peretz', time: now(), message: 'Driver pressed SOS button' } ]; if (args.vehicle_id) alerts = alerts.filter(function(a) { return a.vehicle_id === args.vehicle_id; }); if (args.severity) alerts = alerts.filter(function(a) { return a.severity === args.severity; }); result = alerts.slice(0, args.limit || 20); break; }
    case 'safety.score': { var driver = args.driver_name; if (!driver && args.vehicle_id) { var v = VEHICLES.find(function(x) { return x.vehicle_id === args.vehicle_id; }); if (v) driver = v.driver; } if (!driver) { result = { error: 'Provide driver_name or vehicle_id' }; break; } var score = Math.round(60 + Math.random() * 35); result = { driver: driver, score: score, rating: score >= 90 ? 'excellent' : score >= 75 ? 'good' : score >= 60 ? 'fair' : 'needs_improvement', period_days: args.period_days || 30, events: { speeding: Math.floor(Math.random() * 5), harsh_brake: Math.floor(Math.random() * 4) }, trend: Math.random() > 0.5 ? 'improving' : 'stable' }; break; }
    case 'ui.listPlugins': { result = { plugins: [{ id: 'fleet-dashboard', name: 'Fleet Dashboard', version: '1.0.0', description: 'Real-time fleet overview with vehicle status, alerts, and metrics' }] }; break; }
    case 'ui.getPlugin': { result = { id: 'fleet-dashboard', name: 'Fleet Dashboard', version: '1.0.0', description: 'Real-time fleet overview with vehicle status, alerts, and metrics', render: { mode: 'adaptive', iframeUrl: '/ui/fleet-dashboard/index.html', reactNative: { component: 'fleet-dashboard' } }, channels: ['command'], capabilities: { commands: [{ name: 'focus_vehicle', description: 'Highlight a specific vehicle', input_schema: { type: 'object', properties: { vehicle_id: { type: 'string' } }, required: ['vehicle_id'] } }] } }; break; }
    default: result = { error: 'Unknown tool: ' + name };
  }
  return { content: [{ type: 'text', text: JSON.stringify(result) }], isError: !!(result && result.error) };
}

function handleInitialize() { return { protocolVersion: '2024-11-05', capabilities: { tools: {}, ui: {} }, serverInfo: { name: 'fleet-mcp', version: '2.0.0' } }; }
function handleToolsList() { return { tools: Object.entries(TOOLS).map(function(e) { return { name: e[0], description: e[1].description, inputSchema: e[1].inputSchema }; }) }; }

var buffer = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(chunk) {
  buffer += chunk;
  var nl;
  while ((nl = buffer.indexOf('\n')) !== -1) {
    var line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    if (!line) continue;
    try { var msg = JSON.parse(line); var response = dispatch(msg); if (response) process.stdout.write(JSON.stringify(response) + '\n'); }
    catch (err) { process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error', data: err.message } }) + '\n'); }
  }
});

function dispatch(msg) {
  if (msg.id === undefined) return null;
  switch (msg.method) {
    case 'initialize': return { jsonrpc: '2.0', id: msg.id, result: handleInitialize() };
    case 'tools/list': return { jsonrpc: '2.0', id: msg.id, result: handleToolsList() };
    case 'tools/call': return { jsonrpc: '2.0', id: msg.id, result: handleToolCall(msg.params && msg.params.name, (msg.params && msg.params.arguments) || {}) };
    case 'ping': return { jsonrpc: '2.0', id: msg.id, result: {} };
    default: return { jsonrpc: '2.0', id: msg.id, error: { code: -32601, message: 'Method not found: ' + msg.method } };
  }
}
process.stderr.write('fleet-mcp: ready\n');
