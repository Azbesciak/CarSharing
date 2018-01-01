INSERT INTO carScharing.dbo.[role] ([role]) VALUES ('ADMIN')
INSERT INTO carScharing.dbo.[role] ([role]) VALUES ('USER')


CREATE FUNCTION dbo.RestrictNumberOfPassengers(@RoutePartId INT)
  RETURNS INT AS
  BEGIN
    RETURN (
             SELECT seat_count
             FROM dbo.cars c, dbo.routes r, dbo.route_parts rp
             WHERE rp.route_part_id = @RoutePartId AND rp.route_id = r.route_id AND c.car_id = r.car_id
           )
           -
           (
             SELECT COUNT(user_id)
             FROM dbo.route_part_passengers
             WHERE route_part_id = @RoutePartId
           )
  END;

ALTER TABLE dbo.route_part_passengers
  ADD CONSTRAINT CK_ROUTE_PARTS_PASSENGERS_MAX CHECK (dbo.RestrictNumberOfPassengers(route_part_id) > 0);
