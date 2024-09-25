import { prisma } from '../../libs/prisma';

function checkPermissions(requiredPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Fetch user permissions from the database
      const userPermissions = await prisma.userPermission.findMany({
        where: { user_id: req.user.id },
        include: {
          permission: true,
        },
      });

      const userPermissionNames = userPermissions.map(
        (up) => up.permission.name,
      );

      // Check if the user has all the required permissions
      const hasPermission = requiredPermissions.every((permission) =>
        userPermissionNames.includes(permission),
      );

      if (!hasPermission) {
        return res.status(403).json({ error: 'Access denied' });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error checking permissions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default checkPermissions;
